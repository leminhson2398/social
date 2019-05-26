import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Fade from '@material-ui/core/Fade'
// main card style jss
import cardStyle from './cardStyle'
import avatar from '../../../static/img/shop-icon.png'
import media from '../../../static/img/shop-icon.png'
import ButtonIcon from '../../button/icon/IconButton'
import SocialSharePanel from './SocialSharePanel'
import UserPopup from './UserPopup'
// import icons
import { ShoppingCart, BarChart, Public } from '@material-ui/icons'


class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openMediaDimmer: null,
      socialShareVisible: null,
      openPopup: false,
      anchorEl: null,
    }
    this.popupTimeout = null
  }

  showUserPopup = (event) => {
    this.setState({
      openPopup: !this.state.openPopup,
      anchorEl: event.currentTarget,
    })
    // let popup automatically close after 6 secs
    this.popupTimeout = setTimeout(() => this.setState({ openPopup: false }), 6000)
  }

  handlePopupMouseEnter = () => {
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout)
    }
  }

  handlePopupMouseLeave = () => {
    this.popupTimeout = setTimeout(() => this.setState({ openPopup: false }), 6000)
  }

  componentWillUnmount() {
    clearTimeout(this.popupTimeout)
    this.popupTimeout=null
  }

  render() {
    let { classes } = this.props
    let { socialShareVisible, openPopup, openMediaDimmer, anchorEl } = this.state

    return (
      <Card className={classes.card} elevation={1}>
        <CardHeader
          avatar={
            <Fragment>
              <span
                className={classes.avatarOuter}
                aria-describedby='user-popup'
                onClick={this.showUserPopup}
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
                onMouseEnter={this.handlePopupMouseEnter}
                onMouseLeave={this.handlePopupMouseLeave}
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
          onMouseEnter={() => this.setState({ openMediaDimmer: true })}
          onMouseLeave={() => this.setState({ openMediaDimmer: false })}
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
                    onClick={() => this.setState({ socialShareVisible: !socialShareVisible })}
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
}

export default withStyles(cardStyle)(ProductCard)
