from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('show/', ShowTodo.as_view()),
    path('create/', CreateTodo.as_view()),
    path('update/<int:pk>/', UpdateTodo.as_view()),
    path('delete/completed/', DeleteCompletedTodo.as_view()),
    path('delete/user/<int:pk>/', UserDeleteView.as_view()),
    path('delete/', DeleteAllTodo.as_view()),
    path('register/', Register.as_view()),
    path('token/', MytokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
