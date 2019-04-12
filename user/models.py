from django.db import models
from django.contrib.auth.models import User
from user.utils import Reference as Ref
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy
from uuid import uuid4
from django.dispatch import receiver
from django.db.models.signals import post_save


def validate_phone_number(value):
    if not str(AppUser.phone).isnumeric():
        raise ValidationError(
            gettext_lazy("%(value) is not a valida phone number."),
            params={'value': AppUser.phone}
        )


class AppUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    display_name = models.CharField(max_length=50, db_index=True, blank=True, null=False)
    avatar = models.ImageField(upload_to='avatars/%Y/%m/%d')
    date_of_birth = models.DateField(blank=True, null=True)
    quote_of_life = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=Ref.GENDERS, null=False, blank=False)
    phone = models.CharField(max_length=15, null=True, blank=True, validators=[validate_phone_number])
    role = models.CharField(max_length=10, choices=Ref.ROLES, default=Ref.ROLES[0][0])

    def __str__(self):
        return self.user.username

    def save(self, **kwargs):
        if not self.display_name:
            self.display_name = str(self.user.username).strip()
        super().save(**kwargs)

    def get_absolute_url(self):
        pass

    class Meta:
        db_table = 'appUser'
        index_together = ['display_name', 'id']
        verbose_name_plural = 'App Users'


@receiver(post_save, sender=User)
def create_app_user(sender, **kwargs):
    """Using signal to create an app user, right after an user have signed up."""
    if kwargs.get('created', False):
        AppUser.objects.get_or_create(user=kwargs.get('instance'))


class UploadImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, db_index=True)
    image = models.ImageField(upload_to='images/%Y/%m/%d', blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='images')
    added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.id

    def get_absolute_url(self):
        pass

    class Meta:
        ordering = ['-added']