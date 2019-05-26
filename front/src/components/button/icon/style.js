const iconButtonStyle = () => ({
  /**
   * NOTE: Before using any icon, you should define it's class object here
   */
  rec30: {
    width: 30,
    height: 30,
    minHeight: 'unset !important',
    borderRadius: 2,
    minWidth: 'unset',
    boxShadow: 'none',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
  fab30: {
    width: 30,
    height: 30,
    minHeight: 'unset !important',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    boxShadow: 'none',
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#ffffff',
    },
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  fab20: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    minHeight: 'unset',
    minWidth: 'unset',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  whiteBackground: {
    backgroundColor: '#F3F2F2',
  },
  // rec30Icon is for button size 30px, including fab and rec
  size30Icon: {
    color: '#696969',
    width: 20,
  },
  size20Icon: {
    color: '#696969',
    width: 16,
  },
  // closeIcon: {
  //   width: 14,
  //   height: 14,
  // },
  // unpinIcon: {
  //   // 
  // },
  // attachmentIcon: {
  //   width: 20,
  //   height: 26,
  // },
  // photoIcon: {
  //   width: 20,
  //   height: 20,
  // },
  // faceIcon: {
  //   width: 20,
  //   height: 20,
  // },
  // bookmarkHover: {
  //   '&:hover': {
  //     boxShadow: 'inset 0 0 0 100px #0f73ee',
  //   },
  // },
  // shareHover: {
  //   '&:hover': {
  //     boxShadow: 'inset 0 0 0 100px #869fb2',
  //   },
  // },
  // visibilityHover: {
  //   '&:hover': {
  //     boxShadow: 'inset 0 0 0 100px #fb5252',
  //   },
  // },
})

export default iconButtonStyle
