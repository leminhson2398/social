const galleryStyle = theme => ({
  gallery: {
    overFlow: 'hidden',
  },
  galleryHeader: {
    height: 46,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
    boxShadow: '0 0.25rem .25rem rgba(0,0,0,.075)',
  },
  galleryTitle: {
    color: '#B54E59',
    fontSize: 18,
    fontFamily: "'Lobster', sans-serif",
    textShadow: '2px 2px 2px rgba(168, 62, 62, 0.4)',
    cursor: 'pointer',
  },
  galleryBody: {
    height: 300,
    overflowY: 'scroll',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 10px 10px 10px',
    alignContent: 'baseline',
    justifyContent: 'center',
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
  leftControl: {

  },
  imageSpan: {
    width: 100,
    height: 100,
    borderRadius: 4,
    overflow: 'hidden',
    background: '#494949',
    margin: 4,
    boxShadow: '0 0.25rem .25rem rgba(0,0,0,.075)',
  },
})

export default galleryStyle
