import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import google from '../../static/img/google.png'
import socialButtonStyle from '../../styles/button/social'
import classNames from 'classnames'


export default withStyles(socialButtonStyle)(
  function Google(props) {
    let { classes } = props
    return (
      <Fab size="small" className={classNames(classes.fab36, classes.google)}>
        <img src={google} />
      </Fab>
    )
  }
)
