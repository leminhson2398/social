import React, { Fragment, useState, createRef } from 'react'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
// import custom button
import ButtonIcon from '../button/icon/IconButton'
// import style
import galleryStyle from './galleryStyle'
// import icons
import { AddAPhoto } from '@material-ui/icons'
// import Croppie
import Croppie from 'croppie'


function Gallery() {
  let classes = makeStyles(galleryStyle)()

  const [galleryState, setState] = useState({
    openImageUploader: false,
    openMedia: true,
    openImageEditor: false,
  })

  const { openImageEditor, openImageUploader, openMedia } = galleryState

  /**
   * 
   * @param {String} name 'openImageEditor' || 'openImageUploader' || 'openMedia'
   */
  function toggleField(name) {
    setState({
      ...galleryState,
      openImageEditor: name === 'openImageEditor' ? true : false,
      openImageUploader: name === 'openImageUploader' ? true : false,
      openMedia: name === 'openMedia' ? true : false,
    })
  }

  return (
    <Paper elevation={0}>
      <Paper className={classes.galleryHeader}>
        <div>
          <span className={classes.galleryTitle}>Media Gallery</span>
        </div>
        <div>
          <ButtonIcon btnType='fab30' tooltip='Upload New Image' iconName='clupload'
            style={{ marginLeft: '10px', }}
            onClick={() => toggleField('openImageUploader')}
          />
          <ButtonIcon btnType='fab30' tooltip='Choose an existing one' iconName='imgsearch'
            style={{ marginLeft: '10px', }}
            onClick={() => toggleField('openMedia')}
          />
          <ButtonIcon btnType='fab30' iconName='morehorriz' style={{ marginLeft: '10px', }} />
        </div>
      </Paper>
      <div>
        <div className={classes.galleryBody}>
          <div className={classes.uploadImageContainer}>

            {openImageEditor ? (
              <div>hihi</div>
            ) : null}

            {openImageUploader ? (
              <Paper elevation={0} className={classes.imageUploadOuter}>
                <input id="gallery-upload-image" accept="image/*"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={() => toggleField('openImageEditor')}
                />
                <label htmlFor="gallery-upload-image" style={{ textAlign: 'center' }}>
                  <Typography>Upload your photo here</Typography>
                  <span style={{ display: 'block', color: '#aaa' }}>(jpeg, png, gif, svg)</span>
                  <IconButton
                    color="primary"
                    size="medium"
                    aria-label="Upload picture"
                    component="span"
                  >
                    <AddAPhoto />
                  </IconButton>
                </label>
              </Paper>
            ) : null}

            {openMedia ? (
              <Fragment>
                <span className={classes.imageSpan}>
                  <img src="" alt="" />
                </span>
                <span className={classes.imageSpan}>
                  <img src="" alt="" />
                </span>
                <span className={classes.imageSpan}>
                  <img src="" alt="" />
                </span>
                <span className={classes.imageSpan}>
                  <img src="" alt="" />
                </span>
                <span className={classes.imageSpan}>
                  <img src="" alt="" />
                </span>
                <span className={classes.imageSpan}>
                  <img src="" alt="" />
                </span>
              </Fragment>
            ) : null}

          </div>
        </div>
      </div>
    </Paper>
  )
}

export default Gallery
