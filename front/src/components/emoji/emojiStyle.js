const emojiStyle = () => ({
    emjBox: {
        maxWidth: 250,
        borderRadius: 5,
    },
    tabs: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        overflowX: 'auto',
    },
    tab: {
        minWidth: 'unset',
        minHeight: 'unset',
        padding: 6,
    },
    tabIcon: {
        fontSize: 'unset',
    },
    iconSpan: {
        width: 26,
        height: 26,
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#dddddd',
        },
    },
    iconContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxHeight: 230,
        overflowY: 'auto',
        '&:hover::-webkit-scrollbar': {
            backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            borderRadius: 0,
            width: 4,
        },
        '&::-webkit-scrollbar-corner': {
            background: 'transparent',
        },
        '&:hover::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(95, 99, 104, 0.2)',
            backgroundClip: 'padding-box',
            borderRadius: 2,
            padding: '100px 0 0',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
            cursor: 'pointer',
        },
    },
})

export default emojiStyle
