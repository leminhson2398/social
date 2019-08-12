cartItems = [
    {
        'item': {
            'id': 'abababababab',
            'shop_id': 'jhdkjsfdshfdkj',
            'title': 'Title for item',
            'number': 3,
            'total_price': 60,
        }
    },
    {
        'item': {
            'id': 'jkjsdhfkjhsdfs',
            'shop_id': 'jhdkjsfdshfdkj',
            'title': 'Second title',
            'number': 2,
            'total_price': 30,
        }
    }
]
import json
print(repr(json.dumps(cartItems, indent=4)))

