from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import DocType, Text, Date
from elasticsearch.helpers import bulk
from elasticsearch import Elasticsearch
from shops import models
connections.create_connection()


class ShopIndex(DocType):
	owner = Text()
	name = Text()
	slug = Text()
	created = Date()
	slogan = Text()

	class Meta:
		index = 'shop-index'


def bulk_indexing():
	ShopIndex.init()
	es = Elasticsearch()
	bulk(client=es, actions=(instance.indexing() for instance in models.Shop.objects.all().iterator()))
