import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import socialButtonStyle from '../../styles/button/social'
import facebook from '../../static/img/facebook.png'
import Fab from '@material-ui/core/Fab'


export default withStyles(socialButtonStyle)(
  function Facebook(props) {
    let { classes } = props
    return (
      <Fab className={classes.fab36} color="primary">
        <img src={facebook} />
      </Fab>
    )
  }
)
