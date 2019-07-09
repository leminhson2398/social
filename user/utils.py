from rest_framework_jwt.compat import Serializer, PasswordField
from rest_framework import serializers
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User
from django.db.models import Q
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER
from rest_framework_jwt.serializers import JSONWebTokenSerializer

class Reference(object):
    GENDERS = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )

    ROLES = (
        ('customer', 'Customer'),
        ('seller', 'Seller'),
        ('forwarder', 'Forwarder'),
    )


class CustomJSONWebTokenSerializer(Serializer):
    """
    Pass in a dictionary contains 'email' and 'password'.
    """

    def __init__(self, *args, **kwargs):
        super(CustomJSONWebTokenSerializer, self).__init__(*args, **kwargs)

        self.fields['email'] = serializers.CharField()
        self.fields['password'] = PasswordField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        try:
            user = User.objects.get(Q(email=email))
        except User.DoesNotExist:
            msg = _('You entered wrong email address.')
            raise serializers.ValidationError(msg)
        else:
            credentials = {
                'username': user.username,
                'password': attrs.get('password'),
            }

            user = authenticate(**credentials)
            if user:
                payload = jwt_payload_handler(user)

                return {
                    'token': jwt_encode_handler(payload),
                    'user': user,
                }
            else:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg)
