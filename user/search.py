from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import DocType, Text, Date
connections.create_connection()


class UserIndex(DocType):
	username = Text()
	date_joined = Date()
	