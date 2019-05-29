import React, { Fragment, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
// import custom button 
import ButtonIcon from '../button/icon/IconButton'
// import style
import galleryStyle from './galleryStyle'
// import icons


function Gallery() {
  let classes = makeStyles(galleryStyle)()

  return (
    <Paper elevation={0}>
      <Paper className={classes.galleryHeader}>
        <div>
          <span className={classes.galleryTitle}>Media Gallery</span>
        </div>
        <div>
          <ButtonIcon btnType='fab30' tooltip='Upload New Image' iconName='clupload' style={{ marginLeft: '10px', }} />
          <ButtonIcon btnType='fab30' tooltip='Choose an existing one' iconName='imgsearch' style={{ marginLeft: '10px', }} />
          <ButtonIcon btnType='fab30' iconName='morehorriz' style={{ marginLeft: '10px', }} />
        </div>
      </Paper>
      <div style={{ paddingBottom: '20px', }}>
        <div className={classes.galleryBody}>
          <span className={classes.imageSpan}>
            <img  src="" alt="" />
          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
          <span className={classes.imageSpan}>

          </span>
        </div>
      </div>
    </Paper>
  )
}

export default Gallery
