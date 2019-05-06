import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
// main card style jss
import cardStyle from './cardStyle'
import avatar from '../../static/img/shop-icon.png'
import media from '../../static/img/google.png'
import ButtonIcon from '../button/icon/IconButton'
import SocialSharePanel from './SocialSharePanel'
import UserPopup from './UserPopup'
// import icons
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import BarChart from '@material-ui/icons/BarChart'


class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socialShareVisible: null,
      openPopup: false,
    }
    this.userPopupRef = React.createRef()
  }

  render() {
    let { classes } = this.props
    let { socialShareVisible, openPopup } = this.state

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <React.Fragment>
              <span
                className={classes.avatarOuter}
                // reference for <UserPopup />
                ref={this.userPopupRef}
                aria-describedby='popup'
                onClick={() => this.setState({ openPopup: !openPopup })}
              >
                <Avatar
                  src={avatar}
                  className={classes.avatar}
                  alt={'hihi'}
                ></Avatar>
              </span>
              {/* for user info popup */}
              <UserPopup
                anchorEl={this.userPopupRef}
                open={openPopup}
              />
            </React.Fragment>
          }
          title={
            <Typography component="span" style={{ lineHeight: 'unset' }}>
              <a href="#" title="Le Minh Son" className={classes.usernameUrl}>
                Le Minh Son
              </a>
            </Typography>
          }
          subheader={
            <span className={classes.subHeader}>16 mins</span>
          }
        />
        <CardMedia
          className={classes.cardMedia}
          image={media}
          onMouseOver={() => console.log('over')}
        >
          <div
            aria-label="Media Meta"
            className={classNames(classes.mediaMetaDimmer)}
          >
            <div className={classes.cardMediaAction}>
              <ButtonIcon iconName="visibility" tooltip="View Detail" btnType='rec30'/>
              <ButtonIcon iconName="bookmark" tooltip="Save" btnType='rec30' />
              <span
                style={{ position: 'relative' }}
                onClick={(event) => this.setState({ socialShareVisible: !socialShareVisible })}>
                <ButtonIcon iconName="share" tooltip="Quick Share" btnType='rec30' />
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
