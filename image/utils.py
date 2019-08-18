from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy


class Reference(object):
    FILE_TYPES = (
        ('doc', 'Document'),
        ('img', 'Image'),
        ('ukn', 'Unknown'),
    )
    DOC = 'document'
    IMG = 'image'
    UKN_TYPE = 'unknown'
    FILE_EXTS = ['doc', 'docx', 'pdf', 'xlsx', 'epub', 'xls', 'png', 'jpeg', 'jpg', 'svg']
    DOC_EXTS = ['doc', 'docx', 'pdf', 'xlsx', 'epub', 'xls']
    IMG_EXTS = ['png', 'jpeg', 'jpg', 'gif']
    ACCEPT_DOC_TYPES = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/pdf',
        'application/epub+zip,application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    two_mb = 2097152
    ACCEPT_IMG_TYPES = [
        'image/jpeg', 'image/png', 'image/gif'
    ]

    @classmethod
    def validate_mime_type(cls, file_type, files):
        """
        file_type can be either DOC_TYPE or IMG_TYPE
        this function validate
        uploaded files have valid extension
        """
        if file_type == cls.DOC:
            if all([getattr(doc, 'content_type') in cls.ACCEPT_DOC_TYPES for doc in files]):
                return True
            return False

        elif file_type == cls.IMG:
            if all([getattr(img, 'content_type') in cls.ACCEPT_IMG_TYPES for img in files]):
                return True
            return False

    @classmethod
    def validate_document_type(cls, file):
        ext_name = file.name.split('.')[-1]
        if not ext_name in cls.DOC_EXTS:
            raise ValidationError(
                gettext_lazy("%(ext_name) is not an allowed file type."),
                params={'ext_name': ext_name}
            )

    @classmethod
    def validate_image_type(cls, file):
        ext_name = file.name.split('.')[-1]
        if not ext_name in cls.IMG_EXTS:
            raise ValidationError(
                gettext_lazy("%(ext_name) is not an allowed file type."),
                params={'ext_name': ext_name}
            )

    @classmethod
    def validate_file_size(cls, inputObject):
        """
        make sure the file(s) have got the size <= 2Mb
        """
        if isinstance(inputObject, list):
            return all([getattr(file, 'size') <= cls.two_mb for file in inputObject])
        else:
            # single file object
            return getattr(inputObject, 'size') <= cls.two_mb

    @staticmethod
    def convert_time_aware(time_value):
        """
        accepts datetime.date as argument, converts it to datetime.datetime object includes timezone info
        """
        from datetime import datetime, date
        from pytz import UTC
        from django.utils.timezone import make_aware
        if isinstance(time_value, date):
            time_value = time_value.isoformat()
            return make_aware(value=datetime.strptime(time_value, "%Y-%m-%d"), timezone=UTC)
        else:
            return time_value