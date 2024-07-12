from rest_framework.serializers import ModelSerializer
from .models import TodoTask
from django.contrib.auth.models import User

class TodoTaskSerializer(ModelSerializer):
    class Meta:
        model = TodoTask
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password']
    