# Python modules
import os
import uuid
from datetime import date

# Django modules
from django.conf import settings
from django.core.exceptions import ValidationError

# DRF modules
from rest_framework import serializers

# Models
from feeds.models import (
    Feed,
    FeedImage
)

class FeedSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = Feed
        fields = (
            'pk',
            'user',
            'images',
            'desciptions',
            'like',
            'created',
            'updated'
        )

    def get_images(self, feed):
        images = feed.feed_images.all()

        return [self.content['request'].build_absolute_url(image.image) for image in images]

    def create(self, validated_data):
        today = date.today()

        print(validated_data)
        print(self.context['request'].FILES)
        image_files = self.context['request'].FILES.get('images', None)
        print(image_files)

        if image_files is not None:
            raise ValidationError("이미지 파일이 없습니다.")

        feed = Feed(**validated_data)

        images = []
        for image_file in image_files:
            if 'image' not in image_file.content_type:
                for image in images: 
                    image.image.delete()
                    image.delete()
                raise ValidationError("이미지가 아닌 파일이 포함됐습니다. 이미지만 업로드 해주세요.")
            ext = image_file.content_type.split('/')[-1]

            while True: 
                filename = f"{uuid.uuid4()}.{ext}"
                file_dir = today.strftime("%Y%m/%d")
                # /opt/instarclone/var/media/feeds/%Y/%m/%d/filename.ext
                filepath = os.path.join(settings.MEDIA_ROOT, f"feeds/{file_dir}/{filename}")
                if not os.path.exists(filepath): break
            
            image = FeedImage(feed = feed)
            image.image.save(filename, image_file)
            images.append(image)
            image.save()
            
        feed.save()
        return feed