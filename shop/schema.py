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
    shops = graphene.List(ShopType)
    products = graphene.List(ProductType)
    countries = graphene.List(ImportCountryType)
    categories = graphene.List(CategoryType)
    category = graphene.Field(
        CategoryType,
        search=graphene.String(required=True)
    )
    product = graphene.Field(
        ProductType,
        title=graphene.String(required=True)
    )
    shop = graphene.Field(
        ShopType,
        id=graphene.Int(required=False),
        name=graphene.String(required=False),
    )
    country = graphene.Field(
        ImportCountryType,
        name=graphene.String(required=True),
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
        search = kwargs.get('search', None)
        if search:
            try:
                category = Category.objects.get(name__icontains=search)
            except Category.DoesNotExist:
                raise Exception(
                    f"The category {search!r} does not exist.")
            else:
                return category
        else:
            raise Exception("You should enter text to search.")

    def resolve_country(self, info, **kwargs):
        name = kwargs.get('name', '')
        if name:
            try:
                country = ImportCountry.objects.get(name__icontains=name)
            except ImportCountry.DoesNotExist:
                raise Exception(f"Could not find any country named {name!r}")
            else:
                return country
        else:
            raise Exception("You should enter a name.")

    def resolve_product(self, info, **kwargs):
        title = kwargs.get('title', '')
        if title:
            title = title.lower()
            try:
                product = Product.objects.get(title__icontains=title)
            except Product.DoesNotExist:
                raise Exception(
                    f"Could not find any product with title contains {title!r}")
            else:
                return product
        else:
            raise Exception("You have to enter a product title.")

    def resolve_shop(self, info, **kwargs):
        id, name = [kwargs.get(key, None) for key in ['id', 'name']]
        if id or name:
            if id:
                try:
                    shop = Shop.objects.get(id=id)
                except Shop.DoesNotExist:
                    raise Exception(f"The shop with id={id} does not exist")
                else:
                    return shop
            else:
                try:
                    shop = Shop.objects.filter(name__icontains=name)
                except Shop.DoesNotExist:
                    raise Exception(
                        f"The shop with the name contains {name!r} does not exist.")
                else:
                    return shop
        else:
            raise Exception("You have to enter a shop name.")


class CreateCountry(graphene.Mutation):
    country = graphene.Field(ImportCountryType)

    class Arguments:
        name = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        name = kwargs.get('name',  None)

        if name:
            country = ImportCountry.objects.create(name=name)
            return CreateCountry(country=country)
        else:
            raise Exception('You must provide a name.')


class UpdateShop(graphene.Mutation):
    shop = graphene.Field(ShopType)

    class Arguments:
        name        = graphene.String(required=False)
        email       = graphene.String(required=False)
        phone       = graphene.String(required=False)
        categories  = graphene.List(graphene.NonNull(graphene.Int), required=True)
        slogan      = graphene.String(required=False)
        # get list of category names in alphabetical format

    def mutate(self, info, **kwargs):
        """
        Right when an user sign up, he(she) is automatically created a shop with a few default shop properties.
        So here, we just need to update his(her) shop instead of creating a new one (OneToOne model relationship).
        """
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You must be logged in to update your shop information.")

        category_list = kwargs.pop('categories')
        # try to fetch a shop from db based on owner argument
        # if exists, update with "defaults" argument
        shop = Shop.objects.update_or_create(
            owner=user,
            defaults=kwargs
        )[0]
        # save this shop before adding any category
        category_list = Category.objects.filter(Q(id__in=category_list))
        if category_list.count():
            shop.categories.add(*category_list)
        else:
            raise Exception("You must enter at least one category.")

        return UpdateShop(
            shop=shop
        )


class CreateCategory(graphene.Mutation):
    category = graphene.Field(CategoryType)

    class Arguments:
        name = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        name = kwargs.get('name', None)

        if name:
            category = Category.objects.get_or_create(name=name)
            # using this helps you never mind about database pk increment
            # as get_or_create() returns a tuple(Instance, Boolean)
            category = category[0]
            return CreateCategory(
                category=category
            )
        else:
            raise Exception("You must enter a valid name")


class CreateProduct(graphene.Mutation):
    product = graphene.Field(ProductType)

    class Arguments:
        title           = graphene.String(required=True)
        description     = graphene.String(required=True)
        price           = graphene.Float(required=True)
        on_sale         = graphene.Float(required=False, default_value=0.0)
        total_products  = graphene.Int(required=True)
        categories      = graphene.List(graphene.NonNull(graphene.Int), required=True)
        source          = graphene.List(
            graphene.Int,
            required=False,
            default_value=[],
            description='The country this product was imported.'
        )
        image_url       = graphene.List(
            graphene.NonNull(graphene.String),
            default_value=[],
            required=False
        )

    def mutate(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception(
                "You must be logged in to public your new product.")

        source_list, image_list, category_list = [kwargs.pop(key) for key in ['source', 'image_url', 'categories']]
        new_product = user.shop.products.create(**kwargs)
        if len(source_list):
            source_list = ImportCountry.objects.filter(Q(id__in=source_list))
            if source_list.count():
                new_product.source.add(*source_list)
            else:
                pass
        if len(category_list):
            category_list = Category.objects.filter(Q(id__in=category_list))
            if category_list.count():
                new_product.categories.add(*category_list)
            else:
                raise Exception(
                    "You must enter at least one category."
                )
        if len(image_list):
            new_product.images.add(*image_list)

        return CreateProduct(product=new_product)


# class UpdateProduct(graphene.Mutation):
#     product = graphene.Field(ProductType)

#     class Arguments:
#         title = graphene.String(required=False)
#         description = graphene.String(required=False)
#         price = graphene.Float(required=False)
#         on_sale = graphene.Float(required=False)
#         total_products = graphene.Int(required=False)
#         source = graphene.List(graphene.NonNull(graphene.Int), required=False)
#         categories = graphene.List(graphene.NonNull(graphene.Int), required=False)

#     def mutate(self, info, **kwargs):
#         user = info.user
#         if user.is_anonymous:
#             raise Exception("You must log in to update product")
        
#         category_list = kwargs.pop('categories')
#         product = Product.objects.update(**kwargs)
#         if len(category_list):
#             product.categories.add(*category_list)

#         return UpdateProduct(product=product)


class Mutation(graphene.ObjectType):
    create_country  = CreateCountry.Field()
    create_category = CreateCategory.Field()
    update_shop     = UpdateShop.Field()
    create_product  = CreateProduct.Field()
