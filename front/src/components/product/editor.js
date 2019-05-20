import loading from '../../static/img/loading.gif'

const editorStyle = theme => ({
  editor: {
    backgroundColor: '#f7f0de',
    maxWidth: 600,
    // boderRadius: 5,
  },
  productTitle: {
    fontFamily: "'Lobster', sans-serif",
    fontSize: 24,
    color: '#585858',
    maxWidth: 300,
  },
  timeStamp: {
    textAlign: 'right',
  },
  editArea: {
    padding: 10,
    position: 'relative',
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
  producEditorLabels: {
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: 4,
    color: '#737373',
    position: 'relative',
    left: 4,
    bottom: -2,
    zIndex: 1,
    boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
    fontSize: '0.75rem',
    userSelect: 'none',
  },
  inputFields: {
    padding: '2px 6px 2px 2px',
    marginBottom: 10,
  },
  imageSpan: {
    height: 77,
    margin: 5,
    width: 'auto',
    borderRadius: 4,
    position: 'relative',
    cursor: 'pointer',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    // overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: 'auto',
    borderRadius: 4,
  },
})

export default editorStyle
