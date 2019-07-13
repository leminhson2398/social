from django.db import models
from django.contrib.auth import get_user_model
from user.utils import Reference as Ref
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy
from django.dispatch import receiver
from django.db.models.signals import post_save
from uuid import uuid4


def validate_phone_number(value):
    if not str(value).isnumeric():
        raise ValidationError(
            gettext_lazy("%(value) is not a valid phone number."),
            params={'value': AppUser.phone}
        )


class AppUser(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='profile')
    display_name = models.CharField(max_length=50, db_index=True, blank=True, null=False)
    avatar = models.URLField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    quote_of_life = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=Ref.GENDERS, null=False, blank=False)
    phone = models.CharField(max_length=15, null=True, blank=True, validators=[validate_phone_number])
    role = models.CharField(max_length=10, choices=Ref.ROLES, default=Ref.ROLES[0][0])

    def __str__(self):
        return self.user.username

    def save(self, **kwargs):
        if not self.display_name:
            self.display_name = self.user.username.strip().title()
        else:
            self.display_name = self.display_name.title()
        super().save(**kwargs)
        return self.user

    @property
    def get_absolute_url(self):
        pass

    class Meta:
        db_table = 'appUser'
        index_together = ['display_name', 'id']
        verbose_name_plural = 'App Users'


@receiver(post_save, sender=get_user_model())
def create_app_user(sender, **kwargs):
    """Using signal to create an app user, right after an user have signed up."""
    if kwargs.get('created', False):
        AppUser.objects.get_or_create(user=kwargs.get('instance'))
