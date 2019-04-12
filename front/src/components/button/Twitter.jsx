import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import socialButtonStyle from '../../styles/button/social'
import twitter from '../../static/img/twitter.png'
import classNames from 'classnames'

export default withStyles(socialButtonStyle)(
  function Twitter(props) {
    let {classes} = props
    return (
      <Fab size="small" className={classNames(classes.fab36, classes.twitter)}>
        <img src={twitter} />
      </Fab>
    )
  }
)
