import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
// import Divider from '@material-ui/core/Divider'
import Popover from '@material-ui/core/Popover'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import cardStyle from '../../static/style/product/card'
import avatar from '../../static/img/avatar.png'
import media from '../../static/img/media.jpg'
import ActionPanel from '../button/ActionPanel'
import UserPopup from './UserPopup'


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
        <Popover
          elevation={2}
          id="user-popup"
          className={classes.popOver}
          classes={{
            paper: classes.poPaper
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus// dont know about this yet
        >
        </Popover>
        <CardHeader
          avatar={
            <span
              className={classes.avatarOuter}
              onClick={this.handlePopoverOpen}
              // onMouseLeave={this.handlePopoverClose}
              aria-owns={open ? 'user-popup' : undefined}// for popup
              aria-haspopup="true"
            >
              <Avatar
                src={avatar}
                className={classes.avatar}
                alt={'hihi'}
              ></Avatar>
            </span>
          }
          title={
            <Typography component="span">
              <a href="#" title="Le Minh Son" className={classes.username}>
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
        {/* <Divider /> */}
        <CardActions className={classes.cardAction}>
          <ActionPanel />
        </CardActions>
        {/* <Divider /> */}
        <CardContent>
          <Typography component="h4">
            This will be the product name
          </Typography>
          <Typography component="p">
            This is just a text for description purpose
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(cardStyle)(ProductCard)
