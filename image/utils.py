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
    IMG_EXTS = ['png', 'jpeg', 'jpg', 'svg', 'gif']
    ACCEPT_DOC_TYPES = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/pdf',
        'application/epub+zip,application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
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
