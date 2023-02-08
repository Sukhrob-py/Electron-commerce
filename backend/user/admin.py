from django.contrib import admin

# Register your models here.
from .models import User,UserConfirmation,PasswordResetConfirmation


admin.site.register(User)
admin.site.register(UserConfirmation)
admin.site.register(PasswordResetConfirmation)
