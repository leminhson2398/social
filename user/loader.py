from collections import defaultdict
from promise import Promise
from promise.dataloader import DataLoader
from django.contrib.auth.models import User
from shop.models import Shop


class ShopsByUserIdLoader(DataLoader):
    def batch_load_fn(self, user_ids):
        # create dictionary like {'a': [1, 2, 3, 4], ...}
        shops_by_user_ids = defaultdict(list)

        for shop in Shop.objects.filter(owner_id__in=user_ids).iterator():
            shops_by_user_ids[shop.owner_id].append(shop)

        return Promise.resolve([shops_by_user_ids.get(owner_id, []) for owner_id in user_ids])
