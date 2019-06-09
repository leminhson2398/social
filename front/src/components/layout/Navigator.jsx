import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
// import style
import navStyle from './navigatorStyle'
// import icons
import { Home, People } from '@material-ui/icons'

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'Authentication', icon: <People />, active: true },
      { id: 'Database', icon: <People /> },
      { id: 'Storage', icon: <People /> },
      { id: 'Hosting', icon: <People /> },
      { id: 'Functions', icon: <People /> },
      { id: 'ML Kit', icon: <People /> },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Analytics', icon: <People /> },
      { id: 'Performance', icon: <People /> },
      { id: 'Test Lab', icon: <People /> },
    ],
  },
]

export default function Navigator(props) {

  const classes = makeStyles(navStyle)()

  const { ...other } = props


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
        {categories.map(({ id, children }) => (
          <Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                key={childId}
                button
                className={`${classes.item} ${active && classes.itemActiveItem}`}
              >
                <ListItemIcon
                  className={classes.itemIcon}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </Fragment>
        ))}
      </List>
    </Drawer>
  )
}

export default Navigator
