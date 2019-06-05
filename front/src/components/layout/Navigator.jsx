import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// import style
import navStyle from './navigatorStyle'
// import icons
import {Home, } from '@material-ui/icons'


export default function Navigator(props) {

  const classes = makeStyles(navStyle)()

  const {...other} = props


  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={`${classes.firebase} ${classes.item} ${classes.itemCategory}`}>
          Navigation
        </ListItem>
        <ListItem className={`${classes.item} ${classes.itemCategory}`}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Project overview
          </ListItemText>
        </ListItem>
        
      </List>
    </Drawer>
  )
}