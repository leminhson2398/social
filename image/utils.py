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
    FILE_EXTS = ['doc', 'docx', 'pdf', 'xlsx',
                 'epub', 'xls', 'png', 'jpeg', 'jpg', 'svg']
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

    @staticmethod
    def validate_mime_type(file_type, files):
        """
        file_type can be either DOC_TYPE or IMG_TYPE
        this function validate
        uploaded files have valid extension
        """
        if file_type == Reference.DOC:
            if all(getattr(doc, 'content_type') in Reference.ACCEPT_DOC_TYPES for doc in files):
                return True
            return False

        elif file_type == Reference.IMG:
            if all(getattr(img, 'content_type') in Reference.ACCEPT_IMG_TYPES for img in files):
                return True
            return False

    @staticmethod
    def validate_document_type(file):
        ext_name = str(file.name).rsplit('.', 1)[1]
        print(dir(file))
        if not ext_name in Reference.DOC_EXTS:
            raise ValidationError(
                gettext_lazy("%(ext_name) is not an allowed file type."),
                params={'ext_name': ext_name}
            )

    @staticmethod
    def validate_image_type(file):
        ext_name = str(file.name).rsplit('.', 1)[1]
        if not ext_name in Reference.IMG_EXTS:
            raise ValidationError(
                gettext_lazy("%(ext_name) is not an allowed file type."),
                params={'ext_name': ext_name}
            )

    @staticmethod
    def validate_file_size(input_object):
        """
        make sure the file(s) have got the size <= 2Mb
        """
        if isinstance(input_object, list):
            return all([getattr(file, 'size') <= Reference.two_mb for file in input_object])
        else:
            # single file object
            return getattr(input_object, 'size') <= Reference.two_mb
