import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
// import PropTypes from 'prop-types'
import Popper from '@material-ui/core/Popper'
import paletteStyle from './colorPaletteStyle'

const colors = [
  { name: 'red' },
  { name: 'orange' },
  { name: 'yellow' },
  { name: 'green' },
  { name: 'blue' },
  { name: 'brown' },
  { name: 'violet' },
  { name: 'unset' },
]

function ColorPalette({ open, anchorEl, giveMeColor, ...other }) {

  const classes = makeStyles(paletteStyle)()

  return (
    <Popper
      anchorEl={anchorEl}
      open={open}
      id="color-palette"
      transition
      placement="bottom"
      {...other}
    >
      <Paper elevation={1} className={classes.palette}>
        {colors.map(color => (
          <span
            key={color.name}
            className={`${classes.colorBtn} ${classes[color.name + 'Btn']}`}
            onClick={() => giveMeColor(color.name)}
            title={color.name}
          ></span>
        ))}
      </Paper>
    </Popper>
  )
}

// ColorPalette.propsTypes = {
//   props: PropTypes.object,
// }

export default ColorPalette
