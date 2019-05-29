import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Fade from '@material-ui/core/Fade'
// style
import cardStyle from './cardStyle'
import avatar from '../../../static/img/shop-icon.png'
import media from '../../../static/img/shop-icon.png'
import ButtonIcon from '../../button/icon/IconButton'
import SocialSharePanel from './SocialSharePanel'
import UserPopup from './UserPopup'
// icons
import { ShoppingCart, BarChart, Public } from '@material-ui/icons'


function ProductCard() {

  const classes = makeStyles(cardStyle)()

  const [overall, changeState] = useState({
    openMediaDimmer: null,
    socialShareVisible: null,
    openPopup: false,
    anchorEl: null,
  })
  let {
    openMediaDimmer, openPopup,
    socialShareVisible, anchorEl,
  } = overall
  // for setting timeout
  let popupTimeout = null

  return (
    <Card className={classes.card} elevation={1}>
      <CardHeader
        avatar={
          <Fragment>
            <span
              className={classes.avatarOuter}
              aria-describedby='user-popup'
              onClick={(event) => changeState({
                ...overall,
                openPopup: !openPopup,
                anchorEl: event.currentTarget,
              })}
            >
              <Avatar
                src={avatar}
                className={classes.avatar}
                alt={'hihi'}
              />
            </span>
            {/* for user info popup */}
            <UserPopup
              anchorEl={anchorEl}
              open={openPopup}
              onMouseEnter={() => {
                // check popupTimeout state
                if (popupTimeout !== null || popupTimeout !== undefined) {
                  clearTimeout(popupTimeout)
                }
              }}
              onMouseLeave={() => {
                // if (popupTimeout === null) {
                  popupTimeout = setTimeout(() => changeState({ ...overall, openPopup: false }), 6000)
                // }
              }}
            />
          </Fragment>
        }
        title={
          <Typography component="span" style={{ lineHeight: 'unset' }}>
            <a href="#" title="Le Minh Son" className={classes.usernameUrl}>
              Le Minh Son
              </a>
          </Typography>
        }
        subheader={
          <span className={classes.subHeader}>16 mins. <Public style={{ fontSize: '12px' }} /> near Hanoi</span>
        }
      />
      <CardMedia
        className={classes.cardMedia}
        image={media}
        onMouseEnter={() => changeState({ ...overall, openMediaDimmer: true })}
        onMouseLeave={() => changeState({ ...overall, openMediaDimmer: false })}
      >
        <Fade in={openMediaDimmer} timeout={500}>
          <div
            aria-label="Media Meta"
            className={classes.mediaMetaDimmer}
          >
            <div className={classes.cardMediaAction}>
              <ButtonIcon iconName="visibility" tooltip="View Detail" btnType='rec30' />
              <ButtonIcon iconName="bookmark" tooltip="Save" btnType='rec30' />
              <span
                style={{ position: 'relative' }}
              >
                <ButtonIcon iconName="share" tooltip="Quick Share" btnType='rec30'
                  onClick={() => changeState({ ...overall, socialShareVisible: !socialShareVisible })}
                />
                <SocialSharePanel
                  // customStyle will override default style already applied
                  customStyle={{
                    position: 'absolute',
                    top: '50%', transform: 'translate(-105%, -50%)',
                    visibility: socialShareVisible ? 'visible' : 'hidden',
                  }}
                />
              </span>
            </div>
            <div className={classes.cardMediaInfo}>
              <div
                style={{ alignItems: 'center', display: 'inline-flex', marginRight: '20px' }}
              >
                <span><BarChart fontSize="small" /></span>
                <span>1.5k</span>
              </div>
              <div style={{ alignItems: 'center', display: 'inline-flex', marginRight: '20px' }}>
                <span><ShoppingCart fontSize="small" /></span>
                <span>4.0/5</span>
              </div>
            </div>
          </div>
        </Fade>
      </CardMedia>
      <CardContent>
        <Typography component="h5" variant="h6" className={classes.cardTitle}>
          This will be the product name This will be the product name
        </Typography>
        <Typography component="p">
          This is just a text for description purpose and don't wanna be a bit silly 😅 about some thing idiot and don't know
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCard
