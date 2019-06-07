import React, { useState, useReducer, useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
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
import getDate from '../../../lib/getDate'
import ColorPalette from './ColorPalette'
import CategorySelector from './CategorySelector'
// Quill Editor
import Quill from 'quill'
// import style:
import editorStyle from './editorStyle'
// import icons
import { Edit, Menu, AttachMoney, Layers } from '@material-ui/icons'

function reducer(state, action) {
  return Object.assign({}, state, action)
}
function createStore(reducer) {
  let state = { index: null, length: null }
  const getState = () => state
  /**
   * 
   * @param {Object} action - {index: Int, length: Int}
   */
  const dispatch = (action) => (
    state = reducer(state, action)
  )
  return { getState, dispatch }
}
const quillStore = createStore(reducer)


function ProductEditor() {

  // classes will remain the same 
  const classes = makeStyles(editorStyle)()
  let quillRef = React.createRef()

  const [editorState, setState] = useState({
    userUploadImages: [],
    openUserUploadFileField: false,
    openCategorySelector: false,
    openFileGallery: false,
    openColorPalette: false,
    quillDependencies: null,
  })

  const {
    userUploadImages, openUserUploadFileField, openCategorySelector, openFileGallery, openColorPalette,
    quillDependencies,
  } = editorState

  // quillEditor will not change until quillDependencies changes
  let promise = useMemo(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        let quill = new Quill(quillRef.current, {
          modules: {
            toolbar: false,
          },
          placeholder: 'Describe your product here.'
        })
        resolve(quill)
      }, 100)
    })
  }, [quillDependencies])

  let quillEditor = null
  promise.then(quill => {
    quillEditor = quill
  })

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
      userUploadImages: userUploadImages.filter(image => (image.name !== imgName && image.size !== imgSize)),
    })
  }

  function handleCheckboxOpenFileInput() {
    // open file box for uploading new file
    setState({
      ...editorState,
      openUserUploadFileField: !openUserUploadFileField,
    })
  }

  /**
   * 
   * @param {String} type - 'bold' || 'italic'
   */
  function formatSelection(type) {
    type = type.toLowerCase()
    // this function listen and is invoked when user click 'bold' or 'italic' button
    let quillSelection = quillEditor.getSelection()
    if (quillSelection && quillSelection.length > 0) {
      quillStore.dispatch(quillSelection)

      if (type === 'bold' || type === 'italic') {
        let { index, length } = quillStore.getState()
        // if type applied, change it conversely
        let typeAppliedOrNot = quillEditor.getFormat(index, length)[type]
        quillEditor.formatText(index, length, type, typeAppliedOrNot ? false : true)
      }
    }

    else if (type === 'list') {
      quillEditor.setContents({ "ops": [{ "insert": "one" }, { "attributes": { "list": "bullet" }, "insert": "\n" }] })
    }
  }

  function setSelectionColor(value) {
    let { index, length } = quillStore.getState()
    if (value === 'unset') {
      // quillEditor.formatText(index, length, { color: false })
      quillEditor.formatText(index, length, 'color', false)
    } else {
      quillEditor.formatText(index, length, 'color', value)
    }
  }


  return (
    <Paper elevation={1} className={classes.editor}>
      <DialogTitle disableTypography={true}>
        <FormControl>
          <InputLabel htmlFor="product-title-input">Product Title</InputLabel>
          <Input
            id="product-title-input"
            type='text'
            className={classes.productTitle}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="Edit product title" onClick={focusProductTitle}>
                  <Edit />
                </IconButton>
              </InputAdornment>
            }
          />
          {/* <FormHelperText>Help text</FormHelperText> */}
          <FormHelperText className={classes.timeStamp}>{getDate()}</FormHelperText>
        </FormControl>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <span aria-label="product-description-label" className={classes.producEditorLabels}>
          DESCRIPTION
        </span>
        <Paper elevation={0} className={classes.editArea}>
          <Grid container direction="column">
            {/* Quill Editor */}
            <Grid item ref={quillRef} />
            <Grid item style={{ textAlign: 'right' }}>
              <ButtonIcon iconName='bold' btnType='fab30' tooltip='Bold' onClick={() => formatSelection('bold')} />
              <ButtonIcon iconName='italic' btnType='fab30' tooltip='Italic' onClick={() => formatSelection('italic')} />
              <ClickAwayListener onClickAway={() => {
                if (openColorPalette) setState({ ...editorState, openColorPalette: false })
              }}>
                <span style={{ position: 'relative' }}>
                  <ButtonIcon iconName='colortext' btnType='fab30' tooltip='Insert color' onClick={() => {
                    setState({ ...editorState, openColorPalette: !openColorPalette })
                    formatSelection('color')
                  }} />
                  {openColorPalette ? (
                    <ColorPalette giveMeColor={colorValue => setSelectionColor(colorValue)} />
                  ) : null}
                </span>
              </ClickAwayListener>
              <ButtonIcon iconName='list' btnType='fab30' tooltip='Add List' onClick={() => console.log(quillEditor.getLine(1))} />
              <ButtonIcon iconName='face' btnType='fab30' tooltip='Add emoji' />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogContent className={classes.dialogContent}>
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
                        <SvgIcon style={{ width: '14px', color: 'red', }}>
                          <path d="M2,5.27L3.28,4L20,20.72L18.73,22L12.8,16.07V22H11.2V16H6V14L8,12V11.27L2,5.27M16,12L18,14V16H17.82L8,6.18V4H7V2H17V4H16V12Z" />
                        </SvgIcon>
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
      <Collapse in={openFileGallery} timeout={1500}>
        <DialogContent className={classes.dialogContent}>
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
        <DialogContent className={classes.dialogContent}>
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
          <IconButton aria-label="Pice" size="small">
            <AttachMoney />
          </IconButton>
          <InputBase placeholder='Price' type="number" />
        </Paper>
        <Paper elevation={0} className={classes.inputFields}>
          <IconButton aria-label="Sale off" size="small">
            <SvgIcon>
              <path d="M18.5,3.5L3.5,18.5L5.5,20.5L20.5,5.5M7,4A3,3 0 0,0 4,7A3,3 0 0,0 7,10A3,3 0 0,0 10,7A3,3 0 0,0 7,4M17,14A3,3 0 0,0 14,17A3,3 0 0,0 17,20A3,3 0 0,0 20,17A3,3 0 0,0 17,14Z" />
            </SvgIcon>
          </IconButton>
          <InputBase placeholder='Sale off' />
        </Paper>
        <ClickAwayListener onClickAway={() => {
          if (openCategorySelector) setState({ ...editorState, openCategorySelector: false })
        }}>
          <Paper elevation={0} className={classes.inputFields}>
            <IconButton aria-label="Menu" size="small">
              <Menu />
            </IconButton>
            <InputBase placeholder='Categories'
              onFocus={() => setState({ ...editorState, openCategorySelector: true })}
            // multiline={true}
            />
            <CategorySelector openOrNot={openCategorySelector} />
          </Paper>
        </ClickAwayListener>
        <Paper elevation={0} className={classes.inputFields}>
          <IconButton aria-label="Total Products" size="small">
            <SvgIcon>
              <Layers />
            </SvgIcon>
          </IconButton>
          <InputBase placeholder='Total products' type='number' />
        </Paper>
      </DialogContent>
    </Paper>
  )
}

export default ProductEditor
