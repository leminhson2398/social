import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const style = () => ({
  palette: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'baseline',
    padding: 4,
    width: 110,
    zIndex: 1,
    position: 'absolute',
    top: '130%',
    left: 0,
  },
  colorBtn: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    display: 'inline-block',
    margin: 2,
    cursor: 'pointer',
  },
  redBtn: {
    backgroundColor: 'rgba(248, 37, 37, 0.8)',
    boxShadow: '0px 4px 4px rgba(248, 37, 37, 0.3)',
  },
  orangeBtn: {
    backgroundColor: 'rgba(249, 129, 19, 0.8)',
    boxShadow: '0px 4px 4px rgba(249, 129, 19, 0.3)',
  },
  yellowBtn: {
    backgroundColor: 'rgba(246, 225, 27, 0.8)',
    boxShadow: '0px 4px 4px rgba(246, 225, 27, 0.3)',
  },
  greenBtn: {
    backgroundColor: 'rgba(14, 122, 5, 0.8)',
    boxShadow: '0px 4px 4px rgba(14, 122, 5, 0.3)',
  },
  blueBtn: {
    backgroundColor: 'rgba(5, 60, 168, 0.8)',
    boxShadow: '0px 4px 4px rgba(5, 60, 168, 0.3)',
  },
  brownBtn: {
    backgroundColor: 'rgba(124, 56, 6, 0.8)',
    boxShadow: '0px 4px 4px rgba(124, 56, 6, 0.3)',
  },
  violetBtn: {
    backgroundColor: 'rgba(174, 8, 138, 0.8)',
    boxShadow: '0px 4px 4px rgba(174, 8, 138, 0.3)',
  },
  unsetBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
  },
})

const colors = [
  {name: 'red'},
  {name: 'orange'},
  {name: 'yellow'},
  {name: 'green'},
  {name: 'blue'},
  {name: 'brown'},
  {name: 'violet'},
  {name: 'unset'},
]


function ColorPalette(props) {

  const classes = makeStyles(style)()
  let { giveMeColor } = props

  return (
    <Paper elevation={1} className={classes.palette} style={props.style ? props.style : null}>
      {colors.map(color => (
        <span
          key={color.name}
          className={`${classes.colorBtn} ${classes[color.name + 'Btn']}`}
          onClick={() => giveMeColor(color.name)}
          title={color.name}  
        ></span>
      ))}
    </Paper>
  )
}

ColorPalette.propsTypes = {
  props: PropTypes.object,
}

export default ColorPalette
