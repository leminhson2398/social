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
    },
})

export default emojiStyle