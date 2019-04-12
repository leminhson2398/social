import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import cardStyle from '../../styles/product/card'

class Avatar_ extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {} = this.props
    return (
      <span className={}>
        <Avatar src={} className={} alt={}></Avatar>
      </span>
    )
  }
}


class ProductCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes } = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar_
              classStyle={classes}
              src={}
              alt={}
            />
          }
          title=""
          subheader=""
        />
      </Card>
    )
  }
}

export default withStyles(cardStyle)(ProductCard)
