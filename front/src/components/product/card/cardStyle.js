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
  usernameUrl: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#5C5C5C',
    lineHeight: 'unset',
    fontFamily: '"Lobster", cursive',
  },
  subHeader: {
    fontSize: 12,
    fontWeight: 100,
    color: '#6b6565',
    lineHeight: 'unset',
  },
  cardMedia: {
    height: 0,
    paddingTop: '100%',
    // backgroundSize: 'cover',
    position: 'relative',
    // minHeight: 200,
    /**
     * this place specially need to be modified more
     */
    cursor: 'pointer',
  },
  // card media content style --------------
  mediaMetaDimmer: {
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.04) 100%)',
    // opacity: 0,
    // '-webkit-transition': 'opacity 200ms linear',
    // '&:hover': {
    //   opacity: 1,
    // },
  },
  cardMediaAction: {
    display: 'flex',
    flexDirection: 'column',
    float: 'right',
    height: 120,
    justifyContent: 'space-between',
    // top: '50%',
    transform: 'translateY(50%)',
  },
  cardMediaInfo: {
    display: 'flex',
    float: 'right',
    // alignItems: 'flex-end',
    color: '#ffffff',
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 12,
    // width: 100,
    justifyContent: 'space-between',
  },
// end card media content style-------------------------
  cardTitle: {
    fontFamily: "'Lobster', cursive",
    color: '#696969',
    letterSpacing: 0.75,
    fontWeight: 500,
    paddingLeft: 15,
    lineHeight: '20px',
    marginBottom: '0.8em'
  },
  cardContent: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 400,
  },
})

export default cardStyle