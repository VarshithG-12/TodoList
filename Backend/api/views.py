from .models import TodoTask
from django.contrib.auth.models import User
from .serializers import TodoTaskSerializer,UserSerializer
from rest_framework.generics import ListAPIView,CreateAPIView,DestroyAPIView,UpdateAPIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MytokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class ShowTodo(ListAPIView):
    serializer_class = TodoTaskSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return TodoTask.objects.filter(user=user)
    
class CreateTodo(CreateAPIView):
    queryset = TodoTask.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TodoTaskSerializer

class DeleteCompletedTodo(DestroyAPIView):
    serializer_class = TodoTaskSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return TodoTask.objects.filter(user=user).filter(is_Completed=True)
    def destroy(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class DeleteAllTodo(DestroyAPIView):
    serializer_class = TodoTaskSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return TodoTask.objects.filter(user=user)
    def destroy(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UpdateTodo(UpdateAPIView):
    queryset = TodoTask.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TodoTaskSerializer
    def perform_update(self, serializer):
        print(self.request.data)
        return super().perform_update(serializer)

class Register(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create_user(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password'],
        )
        return Response(serializer.data)
    
class UserDeleteView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer




