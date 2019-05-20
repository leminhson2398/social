const express = require('express')
import React from 'react'
import App from './src/App'
import ReactDOMServer from 'react-dom/server'
import {SheetsRegistry} from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {MuiThemeProvider, createMuiTheme, createGenerateClassName} from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'



function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Material-ui</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    <html>
  `
}

function handleRender(req, res) {
  const sheetsRegistry = new SheetsRegistry()

  const sheetsManager = new Map()

  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  })

  const generateClassName = createGenerateClassName()

  const html = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <App />
      </MuiThemeProvider>
    </JssProvider>
  )

  const css = sheetsRegistry.toString()

  res.send(renderFullPage(html, css))
}

const app = express()
app.use(handleRender)

app.listen(3000)
