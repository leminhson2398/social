from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.validators import ValidationError
# from django.db.models import F
from django.contrib.auth.models import User
from user import tasks


class SignupForm(UserCreationForm):
    """
    This form is used for signup new use into system
    extends from UserCreationForm
    """
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email', None)
        if not email:
            raise ValidationError("You must provide an email")
        if User.objects.get(email=email):
            raise ValidationError("Email is alredy taken")
        return email

    def save(self, info):
        """
        info arhument is used to send email
        """
        user = super(SignupForm, self).save(commit=False)
        user.is_active = True
        user.save()
        # context = {
        #     'protocol': info.context.scheme,
        #     'domain': info.context.META['HTTP_HOST'],
        # }
        # send email using celery
        # tasks.send_registration_email.delay(user.id, context)
        return user
