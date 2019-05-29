import React, { Fragment, useState, useReducer, } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import FormHelperText from '@material-ui/core/FormHelperText'
import DialogContent from '@material-ui/core/DialogContent'
import ButtonIcon from '../../button/icon/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import InputBase from '@material-ui/core/InputBase'
import Gallery from '../../gallery/Gallery'
// import Typography from '@material-ui/core/Typography'
import getDate from '../../../lib/getDate'
import CategorySelector from './CategorySelector'
// import style:
import editorStyle from './editorStyle'
// import icons
import { Edit, Menu, AttachMoney } from '@material-ui/icons'

const Unpin = () => (
  <SvgIcon style={{ width: '14px', color: 'red', }}>
    <path d="M2,5.27L3.28,4L20,20.72L18.73,22L12.8,16.07V22H11.2V16H6V14L8,12V11.27L2,5.27M16,12L18,14V16H17.82L8,6.18V4H7V2H17V4H16V12Z" />
  </SvgIcon>
)

function ProductEditor() {

  const classes = makeStyles(editorStyle)()

  const [editorState, setState] = useState({
    userUploadImages: [],
    openUserUploadFileField: false,
    openCategorySelector: false,
    openFileGallery: false,
  })
  let { userUploadImages, openUserUploadFileField, openCategorySelector, openFileGallery } = editorState

  function toggleFileGallery_() {
    // toggle file gallery
    setState({
      ...editorState,
      openFileGallery: !openFileGallery,
    })
  }

  function focusProductTitle() {
    // focus product title input field
    document.getElementById('product-title-input').focus()
  }

  function removeAnImage(imgName, imgSize) {
    // remove an image
    setState({
      ...editorState,
      userUploadImages: userUploadImages.filter(image => (image.name !== imgName && image.size !== imgSize))
    })
  }

  function handleCheckboxOpenFileInput() {
    // open file box for uploading new file
    setState({
      ...editorState,
      openUserUploadFileField: !openUserUploadFileField,
    })
  }

  return (
    <Paper elevation={1} className={classes.editor}>
      <DialogTitle disableTypography={true}>
        <FormControl>
          <InputLabel htmlFor="product-title-input">Product Title</InputLabel>
          <Input
            id="product-title-input"
            className={classes.productTitle}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label='Edit product title' color="primary" onClick={focusProductTitle}>
                  <Edit />
                </IconButton>
              </InputAdornment>
            }
          />
          {/* <FormHelperText>Help text</FormHelperText> */}
          <FormHelperText className={classes.timeStamp}>{getDate()}</FormHelperText>
        </FormControl>
      </DialogTitle>
      <DialogContent style={{ paddingTop: '24px', }}>
        <span aria-label="product-description-label" className={classes.producEditorLabels}>
          DESCRIPTION
        </span>
        <Paper elevation={0} className={classes.editArea}>
          <Grid container direction="column">
            <Grid
              item
              className={classes.descriptionArea}
              contentEditable={true}
              spellCheck={true}
              role='textbox'
              tabIndex={0}
            />
            <Grid item style={{ textAlign: 'right' }}>
              <ButtonIcon iconName='face' btnType='fab30' tooltip='Add emoji' />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogContent>
        <span aria-label="product-description-label" className={classes.producEditorLabels}>
          IMAGES
        </span>
        <Paper elevation={0} className={classes.editArea}>
          <Grid container direction="column">
            <Grid item>
              {userUploadImages.length ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'baseline', }}>
                  {userUploadImages.map((image, index) => (
                    <span
                      className={classes.imageSpan}
                      key={index}
                    >
                      <span
                        className={`${classes.closeBtn} closeBtn`}
                        title={`Unpin: ${image.name} ?`}
                        onClick={() => removeAnImage(image.name, image.size)}
                      >
                        <Unpin />
                      </span>
                      <img src={image.content} alt={image.name} title={image.name} className={classes.image} />
                    </span>
                  ))}
                </div>
              ) : null}
            </Grid>
            <Grid item style={{ textAlign: 'right' }}>
              <ButtonIcon iconName='photo' btnType='fab30' tooltip={openFileGallery ? 'Close file gallery' : 'Add Photo'} onClick={toggleFileGallery_} />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <Collapse in={openFileGallery}>
        <DialogContent>
          <Gallery />
        </DialogContent>
      </Collapse>
      <DialogContent
        style={{ paddingBottom: 'unset' }}
      >
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleCheckboxOpenFileInput}
              value="openFileInput"
              color="primary"
            />
          }
          label="I have some related files 😍"
        />
      </DialogContent>

      <Collapse in={openUserUploadFileField}>
        <DialogContent>
          <span aria-label="product-description-label" className={classes.producEditorLabels}>
            FILES
          </span>
          <Paper elevation={0} className={classes.editArea}>
            <Grid container direction="column">
              <Grid item>

              </Grid>
              <Grid item style={{ justifyContent: 'flex-end', alignItems: 'center' }} container>
                <span style={{ fontSize: '10px', color: '#979797', fontWeight: 'bold' }}>(2 Mb or below)</span>
                <ButtonIcon iconName='attachment' btnType='fab30' tooltip={openFileGallery ? 'Close file gallery' : 'Attach some files'} onClick={toggleFileGallery_} />
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
      </Collapse>

      <DialogContent style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'visible' }}>
        <Paper elevation={0} className={classes.inputFields}>
          <IconButton aria-label="Pice" color='primary' size="small">
            <AttachMoney />
          </IconButton>
          <InputBase placeholder='Price' type="number" />
        </Paper>
        <Paper elevation={0} className={classes.inputFields}>
          <IconButton aria-label="Sale off" color='primary' size="small">
            <SvgIcon>
              <path d="M18.5,3.5L3.5,18.5L5.5,20.5L20.5,5.5M7,4A3,3 0 0,0 4,7A3,3 0 0,0 7,10A3,3 0 0,0 10,7A3,3 0 0,0 7,4M17,14A3,3 0 0,0 14,17A3,3 0 0,0 17,20A3,3 0 0,0 20,17A3,3 0 0,0 17,14Z" />
            </SvgIcon>
          </IconButton>
          <InputBase placeholder='Sale off' />
        </Paper>
        <ClickAwayListener onClickAway={() => setState({ ...editorState, openCategorySelector: false })}>
          <Paper elevation={0} className={classes.inputFields}>
            <IconButton aria-label="Menu" color='primary' size="small">
              <Menu />
            </IconButton>
            <InputBase placeholder='Categories'
              onFocus={() => setState({ ...editorState, openCategorySelector: true })}
            />
            <CategorySelector openOrNot={openCategorySelector} />
          </Paper>
        </ClickAwayListener>
        <Paper elevation={0} className={classes.inputFields}>
          <IconButton aria-label="Total Product" color='primary' size="small">
            <SvgIcon>
              <path d="M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z" />
            </SvgIcon>
          </IconButton>
          <InputBase placeholder='Total products' type='number' />
        </Paper>
      </DialogContent>
    </Paper>
  )
}

export default ProductEditor
