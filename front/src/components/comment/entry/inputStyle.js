const inputStyle = () => ({
  paperInput: {
    width: 450,
    maxHeight: 150,
    borderRadius: 20,
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
  },
  leftPaperInput: {
    display: 'inline-block',
    borderRadius: 23,
    outline: 'none',
    overflowY: 'auto',
    padding: 12,
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
})

export default inputStyle
