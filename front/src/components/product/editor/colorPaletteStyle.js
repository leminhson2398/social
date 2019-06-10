const paletteStyle = () => ({
    palette: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'baseline',
        padding: 4,
        width: 110,
    },
    colorBtn: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        display: 'inline-block',
        margin: 2,
        cursor: 'pointer',
    },
    redBtn: {
        backgroundColor: 'rgba(248, 37, 37, 0.8)',
        boxShadow: '0px 4px 4px rgba(248, 37, 37, 0.3)',
    },
    orangeBtn: {
        backgroundColor: 'rgba(249, 129, 19, 0.8)',
        boxShadow: '0px 4px 4px rgba(249, 129, 19, 0.3)',
    },
    yellowBtn: {
        backgroundColor: 'rgba(246, 225, 27, 0.8)',
        boxShadow: '0px 4px 4px rgba(246, 225, 27, 0.3)',
    },
    greenBtn: {
        backgroundColor: 'rgba(14, 122, 5, 0.8)',
        boxShadow: '0px 4px 4px rgba(14, 122, 5, 0.3)',
    },
    blueBtn: {
        backgroundColor: 'rgba(5, 60, 168, 0.8)',
        boxShadow: '0px 4px 4px rgba(5, 60, 168, 0.3)',
    },
    brownBtn: {
        backgroundColor: 'rgba(124, 56, 6, 0.8)',
        boxShadow: '0px 4px 4px rgba(124, 56, 6, 0.3)',
    },
    violetBtn: {
        backgroundColor: 'rgba(174, 8, 138, 0.8)',
        boxShadow: '0px 4px 4px rgba(174, 8, 138, 0.3)',
    },
    unsetBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
    },
})

export default paletteStyle
