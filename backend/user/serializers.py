from rest_framework import serializers

import re
from rest_framework.exceptions import ValidationError

from .models import User

email_regex = re.compile(
    r"([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])")


def check_email(email):
    if re.fullmatch(email_regex, email):
        email_or_phone = "email"
    else:
        data = {
            "success": False,
            "message": "email xato kiritilgan!"
        }

        raise ValidationError(data)

    return email_or_phone


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('yuid', 'email')

    def create(self, validated_data):
        email = validated_data.get('email')
        isuser = User.objects.filter(email=email)
        if isuser.exists():
            if isuser[0].password and isuser[0].phone_number:
                raise ValidationError({
                    'message': 'this email is already exist!',
                    'success': False
                })
            else:
                isuser.delete()
        user = super(SignUpSerializer, self).create(validated_data)
        code = user.create_verify_code()
        user.send_email(user.email, code)
        return user

    def validate(self, attrs):
        email = attrs.get('email')

        # isuser = User.objects.filter(email=email)
        # if isuser.exists():
        #     print('validate')
        #     print(isuser[0].password)
        #     print(isuser[0].phone_number)

        check_email(email)
        data = {
            'email': email,
            'username': email
        }
        return data

    def to_representation(self, instance):
        data = super(SignUpSerializer, self).to_representation(instance)
        data.update(instance.tokens())
        return data


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'phone_number',
            'sex',
            'age'
        )

    def create(self, validated_data):
        user = self.context['request'].user
        user.phone_number = validated_data.get('phone_number')
        user.sex = validated_data.get('sex')
        user.age = validated_data.get('age')
        user.save()
        return user

    def validate(self, attrs):
        data = super().validate(attrs)
        phone_number = attrs.get('phone_number')
        print(attrs)
        self.validate_phone(phone_number)
        return data

    def validate_phone(self, phone):
        user = self.context['request'].user
        if User.objects.filter(phone_number=phone).exclude(phone_number=user.phone_number).exists():
            raise ValidationError({
                "message": "this phone number is already exist"
            })
        phone_regex = re.compile(r"^998[0-9]{9}$")
        if (re.fullmatch(phone_regex, phone)) is None:
            data = {
                "success": False,
                "message": "telefon raqam xato kiritilgan!"
            }

            raise ValidationError(data)
