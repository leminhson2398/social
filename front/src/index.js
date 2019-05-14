import React from 'react'
import ReactDOM from 'react-dom'
import { InMemoryCache, HttpLink, ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App'

// import app's initial state and 'temporary reducer of auth'
import { reducer as authReducer, authState } from './state/Auth'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql/',
  }),
  cache: new InMemoryCache(),
})

var initialState = {
  authState: authState
}
var store = createStore(authReducer, initialState)

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.querySelector('#app')
)

module.hot.accept()
