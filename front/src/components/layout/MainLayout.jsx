import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Navigator from './Navigator'
import PropTypes from 'prop-types'
// style
import { drawerWidth, mainStyle } from './layoutStyle'


function MainLayout(props) {

  const classes = makeStyles(mainStyle)()

  const [layoutState, setState] = useState({
    mobileOpen: false,
  })

  const { mobileOpen } = layoutState

  return (
    <div className={classes.root}>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={() => setState({
              ...layoutState,
              mobileOpen: !mobileOpen,
            })}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Navigator PaperProps={{ style: { width: drawerWidth } }} />
        </Hidden>
      </nav>
      <div className={classes.appContent}>
        <Header
          onDrawerToggle={() => setState({
            ...layoutState,
            mobileOpen: !mobileOpen,
          })}
        />
        <main className={classes.mainContent}>
          <Content />
        </main>
      </div>
    </div>
  )
}

MainLayout.propsTypes = {
  props: PropTypes.object,
}

export default MainLayout
