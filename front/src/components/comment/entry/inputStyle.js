const inputStyle = () => ({
  paperInput: {
    width: 450,
    borderRadius: 20,
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
  },
  leftPaperInput: {
    display: 'inline-block',
    maxHeight: 150,
    outline: 'none',
    overflowY: 'auto',
    overflowX: 'hidden',
    fontFamily: "'Roboto', sans-serif",
    verticalAlign: 'baseline',
    background: 'transparent',
    fontSize: 14,
    color: '#333333',
    '&:hover::-webkit-scrollbar': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar': {
      backgroundColor: 'transparent',
      borderRadius: 0,
      width: 8,
    },
    '&::-webkit-scrollbar-corner': {
      background: 'transparent',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(95, 99, 104, 0.2)',
      backgroundClip: 'padding-box',
      borderRadius: 4,
      padding: '100px 0 0',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
  },
  rightPaperInput: {
    display: 'flex',
    borderRadius: 23,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    padding: 5,
  },
  ItemUploadContainer: {
    padding: 5,
  },
  imageSpan: {
    height: 60,
    margin: 5,
    width: 'auto',
    borderRadius: 4,
    position: 'relative',
    '&:hover': {
      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    },
  },
  image: {
    height: '100%',
    width: 'auto',
    borderRadius: 4,
  },
  
})


export default inputStyle
