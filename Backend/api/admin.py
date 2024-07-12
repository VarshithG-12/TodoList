from django.contrib import admin
from .models import TodoTask
from django.contrib.auth.models import User

# Register your models here.
@admin.register(TodoTask)
class TodoTaskAdmin(admin.ModelAdmin):
    list_display = ['id', 'user','body','is_Completed']