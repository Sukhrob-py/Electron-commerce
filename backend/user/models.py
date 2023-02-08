from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
import random
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta
from django.core.mail import send_mail
import uuid

ORDINARY_USER, ADMIN, SUPER_ADMIN = (
    'ordinary_user',
    'admin',
    'super_admin'
)
MALE, FEMALE = (
    'male',
    'female'
)


class PasswordResetConfirmation(models.Model):
    code = models.CharField(max_length=4)
    user = models.ForeignKey(
        'user.User', models.CASCADE, 'reset_password_codes')
    expiration_time = models.DateTimeField()
    is_confirmed = models.BooleanField(default=False)
    yuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    password = models.CharField(max_length=100)

    def __str__(self):
        return str(self.user.__str__())

    def save(self, *args, **kwargs):
        if not self.pk:
            self.expiration_time = datetime.now()+timedelta(minutes=5)
        super(PasswordResetConfirmation, self).save(*args, **kwargs)


class UserConfirmation(models.Model):
    code = models.CharField(max_length=4)
    user = models.ForeignKey('user.User', models.CASCADE, 'verify_codes')
    expiration_time = models.DateTimeField(null=True)
    is_confirmed = models.BooleanField(default=False)
    yuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return str(self.user.__str__())

    def save(self, *args, **kwargs):
        if not self.pk:
            self.expiration_time = datetime.now()+timedelta(minutes=5)
        super(UserConfirmation, self).save(*args, **kwargs)


class User(AbstractUser):
    _validate_phone_number = RegexValidator(
        regex=r"^^998[0-9]{9}$",
        message="Raqamingiz notogri formatda kiritildi. Masalan: 998993451545",
    )

    USER_ROLES = (
        (ORDINARY_USER, ORDINARY_USER),
        (ADMIN, ADMIN),
        (SUPER_ADMIN, SUPER_ADMIN)
    )
    SEX_CHOICES = (
        (MALE, MALE),
        (FEMALE, FEMALE)
    )

    user_role = models.CharField(
        max_length=50, choices=USER_ROLES, default=ORDINARY_USER)
    phone_number = models.CharField(
        max_length=12, null=True, unique=True, validators=[_validate_phone_number])
    sex = models.CharField(max_length=20, choices=SEX_CHOICES, null=True)
    email = models.EmailField(null=True)
    age = models.CharField(max_length=20)
    yuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

    def create_verify_code(self):
        code = "".join([str(random.randint(0, 100) % 10)
                       for _ in range(4)])  # 4936
        print(self.id)
        UserConfirmation.objects.create(
            user_id=self.id,
            code=code
        )
        return code

    def reset_password_create_code(self, password):
        code = "".join([str(random.randint(0, 100) % 10)
                       for _ in range(4)])  # 4936
        PasswordResetConfirmation.objects.create(
            user_id=self.id,
            code=code,
            password=password
        )
        return code

    @staticmethod
    def send_email(to_email, code):
        send_mail(
            'Registration',
            f"verification code is - {code}",
            'sukhrobovlayev@gmail.com',
            [to_email],
            fail_silently=False,
        )

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }
