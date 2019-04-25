import React from 'react'
import ActionPanel from './ActionPanel'
import { withStyles } from '@material-ui/core/styles'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import BarChart from '@material-ui/icons/BarChart'


const frontStyle = () => ({
  frontDimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    display: 'none',
    padding: 20,
    background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(255,255,255,0) 100%)',
    '&:hover': {
      display: 'block',
    },
  },
})



class FrontDimmer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes } = this.props
    return (
      <div className={classes.frontDimmer}>

      </div>
    )
  }
}

export default withStyles(frontStyle)(FrontDimmer)
