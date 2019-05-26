import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'



function ProductDetail() {
  return (
    <Paper elevation={1}>
      <Grid container>
        <Grid item md={6} sm={12}></Grid>
        <Grid item md={6} sm={12}></Grid>
      </Grid>
    </Paper>
  )
}

export default ProductDetail
