const editorStyle = theme => ({
  editor: {
    backgroundColor: '#F5E8C4',
    maxWidth: 600,
    // boderRadius: 5,
  },
  productTitle: {
    fontFamily: "'Lobster', sans-serif",
    fontSize: 24,
    color: '#585858',
    maxWidth: 300,
    // textShadow: '2px 2px 2px rgba(0, 0, 0, 0.25) !important',
  },
  timeStamp: {
    textAlign: 'right',
  },
  editArea: {
    padding: 10,
  },
  descriptionArea: {
    fontSize: 14,
    color: '#333333',
    lineHeight: '20px',
    wordSpacing: 1,
    wordBreak: 'break-word',
    outline: 'none',
    // width: '100%',
    // maxWidth: 552,
  },
  imageSpan: {
    height: 60,
    margin: 5,
    width: 'auto',
    borderRadius: 4,
    position: 'relative',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',    
  },
  image: {
    height: '100%',
    width: 'auto',
    borderRadius: 4,
  },
})

export default editorStyle
