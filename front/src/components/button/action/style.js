const actionStyle = () => ({
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
  
})

export default actionStyle
