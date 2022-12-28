# python modules
import time
import hashlib

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError

class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault('is_active', True)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)
        email = self.normalize_email(email)

        return self.create_user(email, password, **extra_fields)


# Create your models here.
class User(AbstractUser): 
    # 만료시간 5분
    TIMEOUT = 60 * 5
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
 
    email = models.EmailField(max_length=256, unique=True)
    username = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=128, null=True, blank=True)
    profile = models.ImageField(null=False, blank=True)
    description = models.CharField(max_length=512, blank=True)
    authcode = models.CharField(max_length=17)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = UserManager()

    def __repr__(self):
        return f"<User {self.pk} {self.username} {self.updated}>"

    class Meta:
        ordering = ['created']

    def _create_authcode(self):
        timestamp = int(time.time())

        while True:
            authcode = hashlib.sha224(f"{repr(self)}:{timestamp}".encode()).hexdigest()[:6]
            try: User.objects.get(authcode=authcode)
            except User.DoesNotExist:
                self.authcode = f"{authcode}:{timestamp}"
                break

        self.save()
        return authcode

    def create_authcode(self):
        if self.authcode != "":
            splited = self.authcode.split(":")
            
            if time.time() - int(splited[-1]) < self.TIMEOUT:
                raise ValidationError("5분 이후에 인증 코드를 생성할 수 있습니다.") 
        
        authcode = self._create_authcode()
        return authcode
    
    def check_authcode(self, authcode):
        # 1. 인증 코드가 없을 때
        if self.authcode == "":
            raise ValidationError("먼저 인증코드를 생성해 주세요.");

        # 2. 만료시간 체크
        splited = self.authcode.split(":")
        if time.time() - int(splited[-1]) > self.TIMEOUT:
            raise ValidationError("인증 코드가 만료됐습니다. 인증 코드를 새로 생성해 주세요.")

        # 3. 인증 코드가 일치하는지
        if splited[0] == authcode: return True
        else: return False

    def change_lostpassword(self, password):
        self.authcode = ""

        # 패스워드 암호화하여 저장 -> 메소드는 AbstractUser모델에 존재함
        self.set_password(password)
        self.save()

    def change_password(self, password, new_password):
        # password x -> db
        # password 암호와 -> db
        if self.check_password(password): 
            self.set_password(new_password)
            self.save()
        else : raise ValidationError("비밀번호 변경에 실패했습니다.")
    
    def upload_profile(self, profile_image):
        if 'image' not in profile_image.content_type:
            return ValidationError("이미지 파일이 아닙니다. 이미지 파일을 업로드 해주세요.")
        
        ext = profile_image.content_type.split("/")[-1]
        self.profile.save(f"profiles/{self.pk}/profile-{int(time.time())}.{ext}", profile_image)
        
        return self

    def delete_profile(self):
        self.profile = None
        self.save()
        
        return self