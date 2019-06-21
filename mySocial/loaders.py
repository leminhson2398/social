from collections import defaultdict
from promise import Promise
from promise.dataloader import DataLoader
from shop.models import Shop, Product, Category
from django.utils.functional import cached_property
