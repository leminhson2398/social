var socialButtonStyle = () => ({
  fab36: {
    width: 36,
    height: 36,
    minHeight: 'unset !important',
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
  },
  fab34: {
    width: 34,
    minWidth: 34,
    height: 34,
    minHeight: 'unset !important',
    boxShadow: '0px 1px 2px rgba(86, 83, 83, 0.5)',
    border: '2px solid #ffffff',
    '&:active': {
      boxShadow: 'none',
    },
  },
  google: {
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  twitter: {
    backgroundColor: '#56CCF2',
    '&:hover': {
      backgroundColor: '#56CCF2',
    },
  },
  likeIcon: {
    width: 18,
    height: 16,
  },
  dislike: {
    backgroundColor: '#F2B927',
    '&:hover': {
      backgroundColor: '#F2B927',
    },
  },
  dislikeIcon: {
    width: 18,
    height: 16,
  },
  comment: {
    backgroundColor: '#A347B2',
    '&:hover': {
      backgroundColor: '#A347B2',
    },
  },
  commentIcon: {
    width: 16,
    height: 16,
  },
  share: {
    backgroundColor: '#10B1D0',
    '&:hover': {
      backgroundColor: '#10B1D0',
    },
  },
  viewMore: {
    // backgroundColor: '#F2F2F2',
    border: 'unset !important',
  },
  viewIcon: {
    width: 24,
    height: 18,
    color: '#4F4F4F',
  },
  icon: {
    color: '#ffffff',
  },
})

var commentButtonStyle = () => ({
  fab30: {
    width: 30,
    minWidth: 30,
    height: 30,
    minHeight: 'unset !important',
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    '&:active': {
      boxShadow: 'none',
    },
    '&:hover': {
      backgroundColor: '#E3E3E3',
    },
  },
  cloudUploadIcon: {
    width: 20,
    height: 14,
  },
  faceIcon: {
    width: 18,
    height: 18,
  },
  imageUploadIcon: {
    width: 20,
    height: 16,
  },
  iconColor: {
    color: '#BDBDBD',
    '&:hover': {
      color: '#4F4F4F',
    },
  }
})

export {
  socialButtonStyle,
  commentButtonStyle,
}
