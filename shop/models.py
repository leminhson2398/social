from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model
import uuid
from django.dispatch import receiver
from django.db.models.signals import post_save
# below is for elasticsearch
from shop.search import ShopIndex


class Category(models.Model):
    name        = models.CharField(max_length=50, blank=False, null=False, unique=True)
    slug        = models.SlugField(max_length=50, blank=True, null=False)
    created     = models.DateTimeField(auto_now_add=True)
    trending    = models.BooleanField(default=False)
    views       = models.PositiveIntegerField(default=0)

    class Meta:
        ordering            = ['-created']
        db_table            = 'category'
        verbose_name_plural = 'Categories'
        index_together      = ['name', 'id']

    def __str__(self):
        if len(str(self.name)) > 20:
            return str(self.name)[:20]
        return self.name

    def get_absolute_url(self):
        pass

    def save(self, **kwargs):
        self.name = str(self.name).lower().strip()
        if not self.slug:
            self.slug = slugify(str(self.name))
        super().save(**kwargs)
        return self.name


class Shop(models.Model):
    name        = models.CharField(max_length=50, blank=True, null=False, db_index=True, unique=True)
    slug        = models.SlugField(max_length=50, blank=True, null=False, db_index=True)
    owner       = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='shop')
    slogan      = models.CharField(max_length=100, null=True, blank=True)
    categories  = models.ManyToManyField(Category, related_name='shops', symmetrical=False)
    created     = models.DateTimeField(auto_now_add=True)
    updated     = models.DateTimeField(auto_now=True)
    email       = models.EmailField(null=False, blank=True)
    phone       = models.CharField(max_length=12, blank=True, null=True)
    views       = models.PositiveIntegerField(default=0)
    trending    = models.BooleanField(default=False)

    class Meta:
        ordering            = ['-created']
        db_table            = 'shop'
        verbose_name_plural = 'Shops'
        index_together      = ['name', 'id']

    def __str__(self):
        if len(str(self.name)) > 20:
            return str(self.name)[:20]
        return self.name

    def get_absolute_url(self):
        pass

    def save(self, **kwargs):
        if not self.name:
            self.name   = str(self.owner.username).lower().strip()
        elif self.name:
            self.name = str(self.name).lower().strip()
        self.slug   = slugify(self.name)
        if not self.email:
            self.email  = self.owner.email
        super().save(**kwargs)
        return self.name

    def indexing(self):
        """
        this method is for indexing every Shop objects exist in the database
        """
        obj = ShopIndex(
            meta={'id': self.id},
            owner=self.owner.username,
            name=self.name,
            slug=self.slug,
            created=self.created,
            slogan=self.slogan,
        )
        obj.save()
        return obj.to_dict(include_meta=True)


@receiver(post_save, sender=get_user_model())
def create_shop(**kwargs):
    """Create a shop right after an user has signed up."""
    if kwargs.get('created', False):
        Shop.objects.get_or_create(owner=kwargs.get('instance'))


class ImportCountry(models.Model):
    name        = models.CharField(max_length=50, null=False, blank=False, unique=True)
    slug        = models.SlugField(max_length=50, null=False, blank=True)
    created     = models.DateTimeField(auto_now_add=True)
    updated     = models.DateTimeField(auto_now=True)
    trending    = models.BooleanField(default=False)
    views       = models.PositiveIntegerField(default=0)

    class Meta:
        ordering            = ['-created']
        db_table            = 'import_country'
        verbose_name_plural = 'Import Countries'

    def __str__(self):
        return self.name

    def save(self, **kwargs):
        self.name = str(self.name).lower().strip()
        self.slug = slugify(self.name)
        super().save(**kwargs)
        return self.name

    def get_absolute_url(self):
        pass


class Product(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title       = models.CharField(max_length=100, null=False, blank=False, db_index=True, unique=True)
    slug        = models.SlugField(max_length=100, null=False, blank=True, db_index=True)
    description = models.TextField(max_length=1000)
    shop        = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='products')
    # verified    = models.BooleanField(fedault=False)
    categories  = models.ManyToManyField(Category, related_name='products', symmetrical=False)
    added       = models.DateTimeField(auto_now_add=True)
    updated     = models.DateTimeField(auto_now=True)
    price       = models.DecimalField(max_digits=10, decimal_places=2, db_index=True)
    on_sale     = models.DecimalField(max_digits=5, decimal_places=2)
    available   = models.BooleanField(default=True)
    stack       = models.PositiveSmallIntegerField(default=0)
    views       = models.PositiveIntegerField(default=0)
    hot         = models.BooleanField(default=False)
    source      = models.ForeignKey(ImportCountry, on_delete=models.DO_NOTHING, related_name='products', null=True, blank=True)

    class Meta:
        ordering            = ['-added']
        db_table            = 'product'
        verbose_name_plural = 'Products'

    def __str__(self):
        if len(str(self.title)) > 20:
            return str(self.title)[:20]
        return self.title

    def get_absolute_url(self):
        pass

    def save(self, **kwargs):
        self.title = str(self.title).lower().strip()
        self.slug = slugify(self.title)
        if self.stack == 0:
            self.available = False
        elif self.stack != 0:
            self.available = True
        super().save(**kwargs)
        return self.title
