import React from 'react'
import Grid from '@material-ui/core/Grid'
import Chart from './Chart'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Favorite } from '@material-ui/icons'

const style = () => ({
  container: {
    height: 300,
  },
})

class Assesment extends React.Component {

  render() {
    let { classes } = this.props
    return (
      <Grid container className={classes.container}>
        <Grid item xs={4}>
          <Typography variant="h2">4.1/5</Typography>
        </Grid>
        <Grid item xs={8}>
          <Chart />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(style)(Assesment)
