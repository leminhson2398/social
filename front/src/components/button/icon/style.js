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
    // '&:hover': {
    //   boxShadow: 'none',
    // },
    '&:active': {
      boxShadow: 'none',
    },
  },
  whiteBackground: {
    backgroundColor: '#F3F2F2',
  },
  iconCommon: {
    color: '#696969',
    width: 20,
    height: 20,
  },
  // visibilityIcon: {
  //   width: 20,
  //   height: 20,
  // },
  // bookmarkIcon: {
  //   width: 20,
  //   height: 20,
  // },
  // shareIcon: {
  //   width: 20,
  //   height: 20,
  // },
})

export default iconButtonStyle
