import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
// import CardActions from '@material-ui/core/CardActions'
// import Divider from '@material-ui/core/Divider'
// import Popover from '@material-ui/core/Popover'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import cardStyle from '../../static/style/product/card'
import avatar from '../../static/img/shop-icon.png'
import media from '../../static/img/shop-icon.png'
// import ActionPanel from '../button/ActionPanel'
// import UserPopup from './UserPopup'


class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
  }

  handlePopoverClose = () => {
    this.setState({ anchorEl: null })
  }

  handlePopoverOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  render() {
    let { classes } = this.props
    let { anchorEl } = this.state
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <span
              className={classes.avatarOuter}
            >
              <Avatar
                src={avatar}
                className={classes.avatar}
                alt={'hihi'}
              ></Avatar>
            </span>
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
          className={classes.media}
          image={media}
          title="product image"
          onMouseOver={() => console.log('over')}
        >
          <div
            aria-label="Media Meta"
            className={classNames(classes.mediaMeta, { active: false })}
          >
            hihih
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
