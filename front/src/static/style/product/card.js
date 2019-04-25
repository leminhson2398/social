var cardStyle = () => ({
  card: {
    maxWidth: 400,
  },
  avatarOuter: {
    width: 36,
    height: 36,
    background: 'linear-gradient(122.35deg, #FF0000 6.46%, #0C98C4 92.24%)',
    padding: 2,
    borderRadius: '50%',
    display: '-webkit-flex',
    display: 'flex',
    cursor: 'pointer',
  },
  avatar: {
    width: 32,
    height: 32,
    border: '2px solid #ffffff',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    textDecoration: 'none',
    color: '#5C5C5C',
    lineHeight: 'unset',
    fontFamily: '"Lobster", cursive',
  },
  subHeader: {
    fontSize: 12,
    fontWeight: 100,
    color: '#828282',
    lineHeight: 'unset',
  },
  media: {
    height: 0,
    paddingTop: '100%',
    // backgroundSize: 'cover',
    position: 'relative',
  },
  mediaMeta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    background: 'linear-gradient(0deg, rgba(28,28,28,0.95) 0%, rgba(218,218,218,0) 100%)',
  },
  cardAction: {
    padding: '4px 20px',
  },
  popOver: {
    pointerEvents: 'none',
  },
  poPaper: {
    padding: 8,
  },
})

export default cardStyle
