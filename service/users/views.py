# django modules
from django.contrib.auth import authenticate
from django.contrib.auth import login

# drf modeules
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

# models
from users.models import User

#serializers
from users.serializers import UserSerializer

class AuthViewSet(ModelViewSet): 
    serializer_class = UserSerializer
    permission_classes = [ AllowAny ]
    authentication_classes = []

    def signup(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        user = serializer.save()
        login(request, user)
        
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )