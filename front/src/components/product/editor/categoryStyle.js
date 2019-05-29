const selectStyle = () => ({
  selector: {
    padding: 8,
    // position: 'absolute',
    zIndex: 1,
    background: '#ffffff',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: 4,
    // width: '100%',
    position: 'absolute',
    maxHeight: 300,
  },
  search: {
    border: '1px solid #ddd',
    borderRadius: 4,
    padding: 4,
    color: '#676767',
  },
  area1: {
    marginBottom: 8,
  },
  area2: {
    overflowY: 'scroll',
    maxHeight: 200,
    background: 'transparent',
    fontSize: 14,
    color: '#333333',
    '&:hover::-webkit-scrollbar': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar': {
      backgroundColor: 'transparent',
      borderRadius: 0,
      width: 6,
    },
    '&::-webkit-scrollbar-corner': {
      background: 'transparent',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(95, 99, 104, 0.2)',
      backgroundClip: 'padding-box',
      borderRadius: 3,
      padding: '100px 0 0',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
  },
  selectItem: {
    cursor: 'pointer',
    borderRadius: 15,
    padding: 10,
    wordBreak: 'break-word',
    display: 'inline-block',
    '&:hover': {
      background: '#e0dfdf',
    },
  },
  hoverSelectItem: {
    background: '#e0dfdf',
  },
})

export default selectStyle
