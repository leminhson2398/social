import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './theme'

function renderFullPage(html, css) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>My page</title>
      <style id="jss-server-side">${css}</style>
    </head>
    <body>
      <div id="root">${html}</div>
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
