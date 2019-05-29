const authStyle = () => ({
  root: {
    // maxWidth: 650,
    // background: '#F9F9F9',
    padding: '0 14px 0 14px',
  },
  tabs: {
    marginBottom: 40,
    boxShadow: '0 0.25rem .25rem rgba(0,0,0,.075)',
    borderRadius: 5,
  },
  btnStyle: {
    background: 'linear-gradient(90deg, #2386E0 0%, #AE1DE1 100%)',
    width: '100%',
    color: '#ffffff',
    boxShadow: '0px 2px 2px rgba(190, 9, 183, 0.25) !important',
  },
  labelStyle: {
    userSelect: 'none',
    paddingTop: 10,
  },
  forgotPassword: {
    color: '#102ED0',
    textDecoration: 'none',
    fontSize: 12,
    fontWeight: 'thin',
  },
  socialButtonArea: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: 150,
    justifyContent: 'space-around',
    margin: '0 auto 20px auto',
  },
})

export default authStyle
