from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# set default Django settings module for celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mySocial.settings')

app = Celery('mySocial', broker="redis://localhost:6379")

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.

app.config_from_object('django.conf:settings', namespace='CELERY')

# load task modules from all
app.autodiscover_tasks()
