import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import App from './src/App'

function Main() {
  React.useEffect(() => {
    const jsStyles= document.querySelector('#jss-server-side')
    if (jsStyles) {
      jsStyles.parentNode.removeChild(jsStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  )
}

ReactDOM.hydrate(
  <Main />,
  document.querySelector('#app')
)

    // "start": "webpack-dev-server --config ./webpack.config.js --mode development",

