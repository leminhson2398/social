from celery.decorators import task
from django.conf import settings
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
# from PIL import Image
import base64
from io import BytesIO
from django.core.files.base import ContentFile
import time
from django.template.loader import render_to_string
from django.core.mail import send_mail, mail_admins, BadHeaderError


@task
def send_registration_email(uid, context):
    try:
        user = User.objects.get(id=uid)
        print('seding')
    except User.DoesNotExist:
        raise Exception("Couldn't find user with id='{}'".format(uid))
    else:
        context.update({
            'username': user.username,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': default_token_generator.make_token(user),
        })
        subject = render_to_string(
            'user/email/activation_subject.txt', context=context)
        email = render_to_string(
            'user/email/activation_email.txt', context=context)

        send_mail(subject, email, settings.DEFAULT_FROM_EMAIL, [user.email])


@task
def count():
    print(1000)
# def process_uploaded_image_data(rawBase64Data, user_id):
#     if not isinstance(rawBase64Data, str):
#         try:
#             rawBase64Data = str(rawBase64Data)
#         except TypeError:
#             return
#     else:
#         pass

#     try:
#         user = User.objects.get(id=user_id)
#     except User.DoesNotExist:
#         return
#     else:
#         pass

#     # get element at position 1 because the rawBase64Data
#     # will be: data:image/jpeg;base64,/9j/4A.....
#     byteLikeImageData = BytesIO(
#         base64.b64decode(
#             rawBase64Data.split(',', 1)[1]
#         )
#     )
#     # create image
#     image = AvatarImage(
#         image=ContentFile(
#             byteLikeImageData.read(),
#             name="{}-{}-{}.jpg".format(
#                 user.username,
#                 user.id,
#                 str(time.time()).replace('.', '')
#             )
#         ),
#         owner=user
#     )
#     image.save()
#     return image
