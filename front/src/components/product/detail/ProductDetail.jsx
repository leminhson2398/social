import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableTextMobileStepper from './SwipeViewer'



function ProductDetail() {
  return (
    <Paper elevation={1}>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <SwipeableTextMobileStepper />
        </Grid>
        <Grid item sm={6} xs={12}></Grid>
      </Grid>
    </Paper>
  )
}

export default ProductDetail
