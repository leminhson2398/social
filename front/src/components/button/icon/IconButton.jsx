import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import iconButtonStyle from './style'
import SvgIcon from '@material-ui/core/SvgIcon'
import {
  Visibility, BookmarkBorder, Share, Close, TagFaces,
  AddAPhoto, AttachFile, Edit, CloudUpload, ImageSearch,
  MoreHoriz,
} from '@material-ui/icons'
const Unpin = () => (
  <SvgIcon style={{ width: '12px', height: '15px', color: 'red', }}>
    <path d="M2,5.27L3.28,4L20,20.72L18.73,22L12.8,16.07V22H11.2V16H6V14L8,12V11.27L2,5.27M16,12L18,14V16H17.82L8,6.18V4H7V2H17V4H16V12Z" />
  </SvgIcon>
)
module.children = {
  rec: Button,
  fab: Fab,
  share: Share,
  bookmark: BookmarkBorder,
  visibility: Visibility,
  close: Close,
  face: TagFaces,
  photo: AddAPhoto,
  attachment: AttachFile,
  unpin: Unpin,
  edit: Edit,
  clupload: CloudUpload,
  imgsearch: ImageSearch,
  morehorriz: MoreHoriz,
}

/**
 * @param {string} variant - This param is defined in material-ui doc, 
 * it can be: ['text', 'contained', 'outlined'], default to 'contained'
 * @param {string} iconName - This param must be exactly lowercase format, 
 * eg: 'share', 'chat', ...
 * @param {string} btnType - Must be like 'fab34', 'fab30' or 'rec30'
 * 
 * NOTE: Before using any icon, you must input it at the top of this file
 */

class ButtonIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, iconName, tooltip, btnType, onClick, ...other } = this.props
    let Icon_ = module.children[iconName.toLowerCase()]
    let iconToRender = <Icon_
                        className={classes[`size${btnType.slice(btnType.search(/\d/g))}Icon`]}
                      />
    let ButtonOuter = /^(fab)/.test(btnType) ? Fab : Button

    return (
      <ButtonOuter
        className={classes[btnType]}
        onClick={onClick}
        component="span"
        {...other}
      >
        {tooltip ? (
          <Tooltip title={tooltip} placement="top">
            {iconToRender}
          </Tooltip>
        ) :
          iconToRender
        }
      </ButtonOuter>
    )
  }
}

ButtonIcon.propsTypes = {
  classes: PropTypes.object,
  iconName: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  // variant: PropTypes.string,
  btnType: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default withStyles(iconButtonStyle)(ButtonIcon)
