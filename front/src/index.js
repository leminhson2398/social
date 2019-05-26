import React from 'react'
import ReactDOM from 'react-dom'
import { InMemoryCache, HttpLink, ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import App from './App'


const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql/',
  }),
  cache: new InMemoryCache(),
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
)

module.hot.accept()
