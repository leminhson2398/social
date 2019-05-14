const socialButtonStyle = () => ({
  fab36: {
    width: 36,
    height: 36,
    minHeight: 'unset !important',
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
    '&:active': {
      boxShadow: 'none',
    },
  },
  fab30: {
    width: 30,
    height: 30,
    minHeight: 'unset !important',
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  google: {
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff'
    },
  },
  twitter: {
    backgroundColor: '#56CCF2',
    '&:hover': {
      backgroundColor: '#56CCF2'
    },
  },
  facebook: {
    backgroundColor: '#113BD1',
    '&:hover': {
      backgroundColor: '#113BD1'
    },
  },
  pinterest: {
    backgroundColor: '#D72626',
    '&:hover': {
      backgroundColor: '#D72626'
    },
  },
  embed: {
    backgroundColor: '#F27743',
    '&:hover': {
      backgroundColor: '#F27743',
    },
  },
})

export default socialButtonStyle
