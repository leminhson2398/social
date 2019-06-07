import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import App from './src/App'

function renderFullPage(html, css) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
    <style id="jss-server-side">${css}</style>
    <title>App</title>
    </head>
    <body>
      <div id="app">${html}</div>
    </body>
  </html>
  `
}

function handleRender(req, res) {
  const sheets = new ServerStyleSheets()

  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    )
  )

  const css = sheets.toString()

  res.send(renderFullPage(html, css))
}

const app = express()

app.use(handleRender)

app.use('/dist', express.static('dist'))

const port = 3000
app.listen(port)
