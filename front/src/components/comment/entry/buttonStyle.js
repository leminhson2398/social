const buttonStyle = () => ({
  fab30: {
    width: 30,
    height: 30,
    minHeight: 'unset',
    backgroundColor: '#ffffff',
    boxShadow: 'none !important',
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: 'none',
    },
  },
  fab20: {
    width: 20,
    height: 20,
    minHeight: 'unset',
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    '&:hover': {
      // backgroundColor: 'initial',
      boxShadow: 'none',
    },
  },
  iconCommon: {
    color: '#828282',
    '&:hover': {
      color: '#333333',
    },
  },
  attachmentIcon: {
    width: 24,
    height: 20,
  },
  addphotoIcon: {
    width: 24,
    height: 20,
  },
  faceIcon: {
    width: 22,
    height: 22,
  },
  closeIcon: {
    width: 14,
    height: 14,
  },
})

export default buttonStyle
