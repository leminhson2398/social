import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/styles'
import FormHelperText from '@material-ui/core/FormHelperText'
// import icons
import { AddAPhoto } from '@material-ui/icons'

const style = makeStyles({
  outer: {
    width: 250,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    border: '1px dashed #024686',
  },
  button: {

  },
  imageInput: {
    display: 'none !important',
  },
})()


export default function ImageCropper() {
  const classes = style

  return (
    <div className={classes.outer}>
      <input
        accept="image/*"
        className={classes.imageInput}
        id='gallery-upload-image'

      />
      <label htmlFor='gallery-upload-image'>
        <p>Select your photo</p>
        <FormHelperText>(jpeg, png, svg, gif)</FormHelperText>
        <IconButton
          color="primary"
          className={classes.button}
          aria-label="Upload picture"
          component="span"
          size="medium"
        >
          <AddAPhoto />
        </IconButton>
      </label>
    </div>
  )
}
