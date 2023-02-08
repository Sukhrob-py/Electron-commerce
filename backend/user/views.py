from rest_framework import permissions
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView
from datetime import datetime
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
import re
from django.db.models import Q
from django.contrib.auth.hashers import check_password
from .models import User
from .serializers import SignUpSerializer, UpdateProfileSerializer


class CreateUserView(CreateAPIView):
    model = User
    permission_classes = (permissions.AllowAny,)
    serializer_class = SignUpSerializer


class VerifyApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        user, code = request.user, request.data.get('code')
        self.check_verify(user, code)
        return Response(
            data={
                'success': True,
                'access': user.tokens()['access'],
                'refresh': user.tokens()['refresh']
            }, status=200
        )

    @staticmethod
    def check_verify(user, code):
        verifies = user.verify_codes.filter(
            expiration_time__gte=datetime.now(), code=code, is_confirmed=False)
        if not verifies.exists():
            data = {
                'message': 'code is incorrect or expired'
            }
            raise ValidationError(data)
        verifies.update(is_confirmed=True)
        user.save()
        return True


class GetNewVerification(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        self.check_verification(user)
        return Response(
            {
                "success": True
            }
        )

    @staticmethod
    def check_verification(user):
        verifies = user.verify_codes.filter(
            expiration_time__gte=datetime.now(), is_confirmed=False)
        if verifies.exists():
            data = {
                'message': 'You must wait until expirition time over!'
            }
            raise ValidationError(data)

        code = user.create_verify_code()
        user.send_email(user.email, code)


class FinishSignUpApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        user = self.request.user
        if User.objects.filter(phone_number=request.data.get('phone_number')).exists():
            raise ValidationError({
                'message': 'this phone  number is already exist!'
            })

        phone_regex = re.compile(r"^998[0-9]{9}$")
        if (re.fullmatch(phone_regex, request.data.get('phone_number'))) is None:
            data = {
                "success": False,
                "message": "telefon raqam xato kiritilgan!"
            }

            raise ValidationError(data)
        user.age = request.data.get('age')
        user.sex = request.data.get('sex')
        user.phone_number = request.data.get('phone_number')
        user.save()
        return Response({
            "success": True
        })


class UpdateUserProfileApiView(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UpdateProfileSerializer
    queryset = User.objects.all()


class GetProfileAPiView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UpdateProfileSerializer

    def get_queryset(self):
        queryset = User.objects.filter(email=self.request.user.email)
        return queryset


class SetPasswordApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        user = self.request.user
        user_username = request.data.get('username')
        if User.objects.filter(username=user_username).exists():
            raise ValidationError({
                'message': 'this username is already exist!'
            })
        if user_username.isdigit():
            raise ValidationError({
                "message": "username can not be only numbers!"
            })
        if len(user_username) > 30 or len(user_username) < 5:
            raise ValidationError({
                "message": "lengths of username is must be between 5 and 30 characters!"
            })
        password1 = request.data.get('password_confirm')
        password2 = request.data.get('password')
        if password1 != password2:
            raise ValidationError({
                'message': 'password is not matching!'
            })
        if password1.isdigit():
            raise ValidationError({
                "message": "your password can not be only numbers"
            })
        if len(password1) < 5:
            raise ValidationError({
                "message": "your password is to short ( min 5 characters )"
            })
        if password1.isalpha():
            raise ValidationError({
                "message": "your password is to common please choose more difficulty one"
            })
        user.username = user_username
        user.set_password(password1)
        user.save()
        return Response({
            "success": True,
            "message": "password and username have been set !"
        })


class ResetPasswordApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        user = self.request.user
        password = request.data.get('password')
        if password.isdigit():
            raise ValidationError({
                "message": "your password can not be only numbers"
            })
        if password.isalpha():
            raise ValidationError({
                "message": "your password is to simple. Choose more defficulty one"
            })
        if len(password) < 5:
            raise ValidationError({
                "message": "your password is to short ( min 5 characters )"
            })
        verifies1 = user.reset_password_codes.filter(
            expiration_time__gte=datetime.now(), is_confirmed=False)
        if verifies1.exists():
            raise ValidationError({
                "message": "you must wait until expiration time over !"
            })
        code = user.reset_password_create_code(password)
        user.send_email(user.email, code)
        return Response({
            "message": "code yuborildi"
        })


class ResetPasswordConfirmationApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        user = self.request.user
        code = request.data.get('code')
        self.check_verification(user, code)
        return Response({
            "message": "password has been changed"
        })

    @staticmethod
    def check_verification(user, code):
        verifies = user.reset_password_codes.filter(expiration_time__gte=datetime.now(),
                                                    code=code, is_confirmed=False)
        if not verifies.exists():
            raise ValidationError({
                "message": "code is incorrect or expired!"
            })
        user.set_password(verifies[0].password)
        user.save()
        verifies.update(is_confirmed=True)


class LoginApiVew(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username_or_email = request.data.get('username_email_phone')
        password = request.data.get('password')
        user = self.request.user

        is_authenticate = self.authenticate(username_or_email, password)

        if not is_authenticate is None:
            return Response(
                data={
                    'success': True,
                    'access': is_authenticate.tokens()['access'],
                    'refresh': is_authenticate.tokens()['refresh'],
                    'username': is_authenticate.username,
                    'email': is_authenticate.email,
                    'phone_number': is_authenticate.phone_number
                }, status=200
            )

        else:
            raise ValidationError({
                "message": "password is incorrect!"
            })

    @staticmethod
    def authenticate(username=None, password=None):
        try:
            user = User.objects.get(
                Q(phone_number=username) | Q(email=username) | Q(
                    username=username)
            )

        except User.DoesNotExist:
            raise ValidationError({
                "message": "email ( phone_number or username ) is incorrect!"
            })

        if user and check_password(password, user.password):
            return user

        return None
