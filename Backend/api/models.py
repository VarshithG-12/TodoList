from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class TodoTask(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.CharField(max_length=500)
    date = models.DateField(default=None, null=True)
    is_Completed = models.BooleanField()
