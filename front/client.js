import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

function Main() {
  React.useEffect(() => {
    const jsStyles= document.querySelector('#jss-server-side')
    if (jsStyles) {
      jsStyles.parentNode.removeChild(jsStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div>
        hihihi
      </div>
    </ThemeProvider>
  )
}

ReactDOM.hydrate(
  <Main />,
  document.querySelector('#root')
)
