import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { createGenerateClassName } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {} from '@material-ui/icons'

const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4"
]

const muiBaseTheme = createMuiTheme()

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
})

function Card() {

  return (
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            useNextVariants: true
          },
          overrides: null
        })}
      >
        <Card className=''>

        </Card>
      </MuiThemeProvider>
    </JssProvider>
  )
}
