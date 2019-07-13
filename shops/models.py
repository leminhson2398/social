from django.db import models
from django.utils.text import slugify
import uuid
from django.dispatch import receiver
from django.db.models.signals import post_save
# below is for elasticsearch
from shops.search import ShopIndex
from django.contrib.auth import get_user_model
from django.core.validators import ValidationError
from image.models import ProductDocument, ProductImage


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
        index_together      = ['name']

    def __str__(self):
        if len(self.name) > 20:
            return str(self.name)[:20]
        return self.name

    def get_absolute_url(self):
        pass

    def save(self, **kwargs):
        self.name = self.name.lower().strip()
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(**kwargs)
        return self.name


class EmployeeShip(models.Model):
    staff           = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, related_name='employee_ships')
    shop            = models.ForeignKey('Shop', on_delete=models.CASCADE, related_name='employee_ships')
    joined_since    = models.DateTimeField(auto_now_add=True)
    left_since      = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-joined_since']
        db_table = 'employee_ship'

    def __str__(self):
        return f"{self.staff.id} - {self.shop.id}"


class Following(models.Model):
    """
    m2m people follow shops
    """
    shop    = models.ForeignKey('Shop', on_delete=models.CASCADE, related_name='following')
    user    = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='following')
    since   = models.DateTimeField(auto_now_add=True)


class Shop(models.Model):
    name        = models.CharField(max_length=50, blank=True, null=False, db_index=True, unique=True)
    slug        = models.SlugField(max_length=50, blank=True, null=False, db_index=True)
    owner       = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='shop')
    slogan      = models.CharField(max_length=100, null=True, blank=True)
    categories  = models.ManyToManyField(Category, related_name='shops')
    created     = models.DateTimeField(auto_now_add=True)
    updated     = models.DateTimeField(auto_now=True)
    email       = models.EmailField(null=False, blank=True)
    phone       = models.CharField(max_length=12, blank=True, null=True)
    views       = models.PositiveIntegerField(default=0)
    trending    = models.BooleanField(default=False)
    location    = models.CharField(max_length=200, null=True, blank=True, db_index=True)
    employees   = models.ManyToManyField(get_user_model(), through=EmployeeShip, related_name='employees', symmetrical=False)
    followers   = models.ManyToManyField(get_user_model(), through=Following, related_name='followers', symmetrical=False)
    active      = models.BooleanField(default=False, db_index=True)

    class Meta:
        ordering            = ['-created']
        db_table            = 'shop'
        verbose_name_plural = 'Shops'
        index_together      = ['name', 'id', 'location', 'active']

    def __str__(self):
        if len(self.name) > 20:
            return str(self.name)[:20]
        return self.name

    def get_absolute_url(self):
        pass

    def save(self, **kwargs):
        self.name = "{} Shop".format(self.owner.username.title()) if not self.name else self.name.strip().title()

        self.slug = slugify(self.name)
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
        Shop.objects.create(owner=kwargs.get('instance'))


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
        self.name = self.name.lower().strip()
        self.slug = slugify(self.name)
        super().save(**kwargs)
        return self.name

    def get_absolute_url(self):
        pass


class Product(models.Model):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, db_index=True)
    title           = models.CharField(max_length=100, null=False, blank=False, db_index=True, unique=True)
    slug            = models.SlugField(max_length=100, null=False, blank=True, db_index=True, unique=True)
    description     = models.TextField(null=False, blank=False)
    shop            = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='products')
    # verified      = models.BooleanField(default=False)
    documents       = models.ManyToManyField(ProductDocument, related_name='products', blank=True)
    images          = models.ManyToManyField(ProductImage, related_name='products', blank=True)
    categories      = models.ManyToManyField(Category, related_name='products')
    added           = models.DateTimeField(auto_now_add=True)
    updated         = models.DateTimeField(auto_now=True)
    price           = models.DecimalField(max_digits=10, decimal_places=2, db_index=True)
    on_sale         = models.DecimalField(max_digits=5, decimal_places=2)
    available       = models.BooleanField(default=True)
    total_products  = models.PositiveSmallIntegerField(default=0)
    views           = models.PositiveIntegerField(default=0)
    hot             = models.BooleanField(default=False)
    source          = models.ManyToManyField(ImportCountry, related_name='products', blank=True)

    class Meta:
        ordering            = ['-added']
        db_table            = 'product'
        verbose_name_plural = 'Products'
        index_together      = ('slug', 'title', 'id')

    def __str__(self):
        if len(str(self.title)) > 20:
            return str(self.title)[:20]
        return self.title

    def get_absolute_url(self):
        pass

    def save(self, **kwargs):
        self.title = self.title.strip().title()
        self.slug = slugify(self.title)
        self.available = True if self.total_products > 0 else False
        if self.total_products < 0:
            self.total_products = 0
        super().save(**kwargs)
        return self.title
