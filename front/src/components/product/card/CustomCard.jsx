import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { createGenerateClassName } from '@material-ui/styles'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { grey } from '@material-ui/core/colors'
import { } from '@material-ui/icons'

const classes = makeStyles({
  "MuiReviewCard--01": {
    marginBottom: 200,
    maxWidth: 304,
    margin: "auto",
    overflow: "initial",
    position: "relative",
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    boxShadow: "none",
    borderRadius: 0,
    "&:hover": {
      "& .MuiTypography--explore": {
        transform: "scale(1.2)"
      }
    },
  },
  button: {
    marginLeft: 0,
  },
  "MuiCardMedia-root": {
    height: "100%",
  },
  "MuiCardContent-root": {
    boxShadow: "0 16px 40px -12.125px rgba(0,0,0,0.3)",
    borderRadius: muiBaseTheme.spacing.unit / 2,
    margin: `0 ${muiBaseTheme.spacing.unit * 2}px`,
    backgroundColor: "#ffffff",
    position: "absolute",
    top: "60%",
    padding: muiBaseTheme.spacing.unit * 3,
    textAlign: "left",
  },
  contentHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "MuiIcon--text": {
    fontSize: 14,
    color: grey[500],
  },
  contentRating: {
    marginBottom: 4,
    '& svg, .material-icons': {
      fontSize: 20,
      color: grey[300],
    },
    '& .MuiIcon--starred': {
      color: '#ffbb00',
    },
  },
})()

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
