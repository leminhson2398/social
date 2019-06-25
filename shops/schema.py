import graphene
from graphene_django import DjangoObjectType
from shops.models import Category, Product, Shop, ImportCountry
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
    ok          = graphene.Boolean(required=True)
    country     = graphene.Field(ImportCountryType)
    errors      = graphene.String(required=False)

    class Arguments:
        name = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        ok, country, errors = False, None, None
        name = kwargs.get('name',  '')

        if name:
            name = name.strip()
            filtered_names = ImportCountry.objects.filter(Q(name__iexact=name))
            # filter out if there are names already exist
            if filtered_names.count():
                errors = f"Country with name {name!r} does already exist."
            else:
                country = ImportCountry.objects.create(name=name)
                ok = True
                country = country
        else:
            errors = "You must provide a name."
        
        return CreateCountry(
            ok=ok,
            country=country,
            errors=errors,
        )


class UpdateShop(graphene.Mutation):
    ok      = graphene.Boolean(required=True)
    shop    = graphene.Field(ShopType)
    error   = graphene.String(required=False)

    class Arguments:
        name        = graphene.String(required=False)
        email       = graphene.String(required=False)
        phone       = graphene.String(required=False)
        categories  = graphene.List(graphene.NonNull(graphene.Int), required=True)
        slogan      = graphene.String(required=False)
        # get list of category names in alphabetical format

    def mutate(self, info, **kwargs):
        ok, shop, error = False, None, None
        """
        Right when an user sign up, he(she) is automatically created a shop with a few default shop properties.
        So here, we just need to update his(her) shop instead of creating a new one (OneToOne model relationship).
        """
        user = info.context.user
        if user.is_anonymous:
            error = "You have to log in to update your shop."
        else:
            category_list = kwargs.pop('categories')
            # try to fetch a shop from db based on owner argument
            # if exists, update with "defaults" argument
            shop = Shop.objects.update_or_create(
                owner=user,
                defaults=kwargs
            )[0]
            # save this shop before adding any category
            if len(category_list):
                # get initial shop categories
                shop_categories = shop.categories
                category_list = Category.objects.filter(Q(id__in=category_list))
                if category_list.count():
                    shop.categories.add(
                        *[category for category in category_list.iterator() if category not in shop_categories]
                    )
                    ok = True
                    shop = shop
                else:
                    error = "Please enter valid categories."
            else:
                error = "Please enter at least one category."


class CreateCategory(graphene.Mutation):
    ok = graphene.Boolean(required=True)
    category = graphene.Field(CategoryType)
    error = graphene.String(required=False)

    class Arguments:
        name = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        ok, category, error = False, None, None
        user = info.context.user
        if user.is_anonymous:
            error = "You must login to add new category"
        else:
            name = kwargs.get('name', None)

            if not name is None:
                name = name.strip().lower()
                category = Category.objects.get_or_create(name=name)
                # using this helps you never mind about database pk increment
                # as get_or_create() returns a tuple(Instance, Boolean)
                ok = True
                category = category[0]
            else:
                # raise Exception("You must enter a valid name")
                error = "You must enter a category name."

        return CreateCategory(
            ok=ok,
            category=category,
            error=error,
        )


class CreateProduct(graphene.Mutation):
    ok      = graphene.Boolean(required=True)
    product = graphene.Field(ProductType)
    error   = graphene.String(required=False)

    class Arguments:
        title           = graphene.String(required=True)
        description     = graphene.String(required=True)
        price           = graphene.Float(required=True)
        on_sale         = graphene.Float(required=False, default_value=0.0)
        total_products  = graphene.Int(required=True)
        categories      = graphene.List(
            graphene.NonNull(graphene.Int),
            required=True
        )
        source = graphene.List(
            graphene.Int,
            required=False,
            default_value=[],
            description='The country this product was imported.'
        )
        images = graphene.List(
            graphene.NonNull(graphene.String),
            required=False
        )

    def mutate(self, info, **kwargs):
        ok, product, error = False, None, None

        user = info.context.user
        if user.is_anonymous:
            error = "You must login to add new product."
        else:
            source_list, image_list, category_list = [kwargs.pop(key) for key in ['source', 'images', 'categories']]
            new_product = user.shop.products.create(**kwargs)
            if len(source_list):
                source_list = ImportCountry.objects.filter(Q(id__in=source_list))
                if source_list.count():
                    new_product.source.add(*source_list)

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
    create_country = CreateCountry.Field()
    create_category = CreateCategory.Field()
    update_shop = UpdateShop.Field()
    create_product = CreateProduct.Field()
