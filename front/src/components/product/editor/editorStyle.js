
const editorStyle = () => ({
	editor: {
		backgroundColor: '#f7f0de',
		maxWidth: 600,
	},
	productTitle: {
		fontFamily: "'Lobster', sans-serif",
		fontSize: 24,
		maxWidth: 300,
		color: '#696969de',
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
		wordBreak: 'break-all',
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
		fontSize: '0.75rem',
		userSelect: 'none',
		boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
	},
	inputFields: {
		padding: 6,
		marginBottom: 10,
		position: 'relative',
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
		'&:hover .closeBtn': {
			display: 'block !important',
		},
	},
	image: {
		height: '100%',
		width: 'auto',
		borderRadius: 4,
	},
	closeBtn: {
		position: 'absolute',
		top: -10,
		right: -10,
		textAlign: 'center',
		verticalAlign: 'center',
		boxShadow: '0, 0.1rem 0.2rem rgba(0, 0, 0, 0.75)',
		width: 20,
		height: 20,
		borderRadius: '50%',
		display: 'hidden',
	},
})


export default editorStyle
