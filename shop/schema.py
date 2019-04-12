import graphene
from graphene_django import DjangoObjectType
from shop.models import Category, Product, Shop, ImportCountry
from user.schema import UserType
from django.db.models import Q, F


class ShopType(DjangoObjectType):
    class Meta:
        model = Shop


class ProductType(DjangoObjectType):
    class Meta:
        model = Product


class ImportCountryType(DjangoObjectType):
    class Meta:
        model = ImportCountry


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category


class Query(graphene.ObjectType):
    shops       = graphene.List(ShopType)
    products    = graphene.List(ProductType)
    countries   = graphene.List(ImportCountryType)
    categories  = graphene.List(CategoryType)
    category    = graphene.Field(
        CategoryType,
        id=graphene.Int(required=False),
        name=graphene.String(required=False),
    )
    product     = graphene.Field(
        ProductType,
        slug=graphene.Int(required=False),
        title=graphene.String(required=False),
    )
    shop        = graphene.Field(
        ShopType,
        id=graphene.Int(required=False),
        name=graphene.String(required=False),
    )
    country     = graphene.Field(
        ImportCountryType,
        id=graphene.Int(required=False),
        name=graphene.String(required=False),
    )

    def resolve_shops(self, info):
        return Shop.objects.all()

    def resolve_products(self, info):
        return Product.objects.all()

    def resolve_countries(self, info):
        return ImportCountry.objects.all()

    def resolve_categories(self, info):
        return Category.objects.all()

    def resolve_category(self, info, **kwargs):
        id, name = [kwargs.get(key, None) for key in ['id', 'name']]
        if id or name:
            try:
                category = Category.objects.get(Q(id=id) | Q(name__iexact=name))
            except Category.DoesNotExist:
                raise Exception(f"The category with id={id} name={name} does not exists.")
            else:
                return category
        else:
            raise Exception('You should enter an id or a name')

    def resolve_country(self, info, **kwargs):
        id, name = [kwargs.get(key, None) for key in ['id', 'name']]
        if id or name:
            try:
                country = ImportCountry.objects.get(Q(id=id) | Q(name__iexact=name))
            except ImportCountry.DoesNotExist:
                raise Exception(f"The country with id={id if id else '...'}, name={name if name else '...'} does not exist.")
            else:
                return country
        else:
            raise Exception('You should enter an id or a name')

    def resolve_product(self, info, **kwargs):
        slug, title = [kwargs.get(key, None) for key in ['slug', 'title']]
        if slug or title:
            try:
                product = Product.objects.get(Q(slug__iexact=slug) | Q(title__iexact=title))
            except Product.DoesNotExist:
                raise Exception(f"Product with slug={slug if slug else '...'}, title={title if title else '...'} does not exist.")
            else:
                return product
        else:
            raise Exception('You should enter an slug or a title.')

    def resolve_shop(self, info, **kwargs):
        id, name = [kwargs.get(key, None) for key in ['id', 'name']]
        if id or name:
            try:
                shop = Shop.objects.get(Q(id=id) | Q(name__iexact=name))
            except Shop.DoesNotExist:
                raise Exception(f"Shop with id={id if id else '...'}, name={name if name else '...'} does not exist.")
            else:
                return shop
        else:
            raise Exception('You should enter an id or a name')


class CreateCountry(graphene.Mutation):
    id          = graphene.Int()
    name        = graphene.String()
    slug        = graphene.String()
    created     = graphene.DateTime()
    trending    = graphene.Boolean()
    views       = graphene.Int()

    class Arguments:
        name = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        name = kwargs.get('name',  None)

        if bool(name):
            country = ImportCountry.objects.get_or_create(name=name)
            country = country[0]
            return CreateCountry(
                id=country.id,
                name=country.name,
                slug=country.slug,
                created=country.created,
                trending=country.trending,
                views=country.views
            )
        else:
            raise Exception('You must provide name argument.')


class CreateShop(graphene.Mutation):
    id          = graphene.Int()
    name        = graphene.String()
    slug        = graphene.String()
    owner       = graphene.Field(UserType)
    slogan      = graphene.String()
    created     = graphene.DateTime()
    updated     = graphene.DateTime()
    email       = graphene.String()
    phone       = graphene.String()
    views       = graphene.Int()
    trending    = graphene.Boolean()
    categories  = graphene.List(CategoryType)

    class Arguments:
        name        = graphene.String(required=False)
        email       = graphene.String(required=False)
        phone       = graphene.String(required=False)
        categories  = graphene.List(graphene.NonNull(graphene.String), required=True)
        slogan      = graphene.String(required=False)
        # get list of category names in alphabetical format

    def mutate(self, info, **kwargs):
        """
        Right when an user sign up, he(she) is automatically created a shop with a few default shop properties.
        So here, we just need to update his(her) shop instead of creating a new one (OneToOne model relationship).
        """

        user = info.context.user
        if user.is_anonymous:
            raise Exception("You must be logged in to update your shop.")

        categories = kwargs.pop('categories')
        shop = Shop.objects.update_or_create(
            owner=user,
            defaults=kwargs
        )[0]
        # save this shop before adding any category
        categories = Category.objects.filter(name__in=categories)
        shop.categories.add(*categories)

        return CreateShop(
            id=shop.id,
            name=shop.name,
            slug=shop.slug,
            owner=user,
            slogan=shop.slogan,
            created=shop.created,
            updated=shop.updated,
            email=shop.email,
            phone=shop.phone,
            views=shop.views,
            trending=shop.trending,
            categories=categories
        )


# class UpdateShop(graphene.Mutation):
#     pass

#     def mutate(self, info):
#         pass


class CreateCategory(graphene.Mutation):
    id          = graphene.Int()
    name        = graphene.String()
    slug        = graphene.String()
    created     = graphene.DateTime()
    trending    = graphene.Boolean()
    views       = graphene.Int()

    class Arguments:
        name = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        name = kwargs.get('name', None)

        if name:
            category = Category.objects.get_or_create(name=name)
            # using this helps you never mind about database pk increment
            category = category[0]# as get_or_create() returns a tuple(Instance, Boolean)
            return CreateCategory(
                id=category.id,
                name=category.name,
                slug=category.slug,
                created=category.created,
                trending=category.trending,
                views=category.views
            )
        else:
            raise Exception("You must enter a valid name")


# class CreateProduct(graphene.Mutation):
#     product = graphene.Field(ProductType)

#     class Arguments:
#         title = graphene.String(required=True)
#         description = graphene.String(required=True)
#         price = graphene.Float(requried=True)
#         on_sale = graphene.Float(required=False, default_value=0.0)
#         stack = graphene.Int(required=True)
#         categories = graphene.List(graphene.NonNull(graphene.String), required=True)
#         source = graphene.String(required=False, description='The country this was imported.')

#     def mutate(self, info, **kwargs):
#         user = info.context.user
#         if user.is_anonymous:
#             raise Exception("You must be logged in to public your new product.")

#         shop = user.shop
#         source = kwargs.get('source', 0)
#         if source > 0:
#             try:
#                 source = ImportCountry.objects.get(Q(id=source))
#             except ImportCountry.DoesNotExist:
#                 raise Exception(f"The import country you entered is invalid.")
#             else:
#                 categories = kwargs.pop('categories')
#                 product = shop.products.get_or_create
#         else:
#             pass


class Mutation(graphene.ObjectType):
    create_country  = CreateCountry.Field()
    create_category = CreateCategory.Field()
    create_shop     = CreateShop.Field()
