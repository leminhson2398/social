const actionStyle = () => ({
  /**
   * everything is box-sizing so if you set overal 34, border width to 2
   * => actual content width will be 30
   */
  fab34: {
    width: 34,
    minWidth: 34,
    height: 34,
    minHeight: 'unset !important',
    boxShadow: '0px 1px 2px rgba(86, 83, 83, 0.5)',
    '&:active': {
      boxShadow: 'none',
    },
  },
  fab30: {
    width: 30,
    minWidth: 30,
    height: 30,
    minHeight: 'unset !important',
    boxShadow: '0px 1px 2px rgba(86, 83, 83, 0.5)',
    '&:active': {
      boxShadow: 'none',
    },
  },
  border: {
    border: '2px solid #ffffff',
  },
  like: {
    backgroundColor: '#DF394C',
    '&:hover': {
      backgroundColor: '#DF394C',
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
    width: 18,
    height: 18,
  },
  share: {
    backgroundColor: '#10B1D0',
    '&:hover': {
      backgroundColor: '#10B1D0',
    },
  },
  shareIcon: {
    width: 18,
    height: 18,
  },
  iconCommon: {
    color: '#ffffff',
  },
  viewmore: {
    backgroundColor: '#F2F2F2',
    '&:hover': {
      backgroundColor: '#F2F2F2',
    },
    boxShadow: 'inset 0px 1px 2px rgba(86, 83, 83, 0.5)',
  },
  viewmoreIcon: {
    width: 26,
    height: 20,
    color: '#4F4F4F',
  },
})

export default actionStyle
