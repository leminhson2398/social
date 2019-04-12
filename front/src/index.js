import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
const client = new ApolloClient({ uri: 'http://localhost:8000/graphql/' })
import App from './App'
import Google from './components/button/Google'
import Facebook from './components/button/Facebook'
import Twitter from './components/button/Twitter'
import Like from './components/button/Like'
import Disklike from './components/button/Dislike'
import Comment from './components/button/Comment'
import Share from './components/button/Share'
import ActionPanel from './components/product/ActionPanel'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Fragment>
      <Google />
      <Facebook />
      <Twitter />
      <Like />
      <Disklike />
      <Comment />
      <Share />
    </Fragment>
    <ActionPanel />
  </ApolloProvider>,
  document.querySelector('#app')
)

module.hot.accept()
