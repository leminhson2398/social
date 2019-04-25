import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
const client = new ApolloClient({ uri: 'http://localhost:8000/graphql/' })
// import App from './App'
import Card from './components/product/Card'
// import AddCommentImage from './components/button/AddCommentImage'
// import SocialButton from './components/button/social/Social'
// import ProductDetail from './components/product/ProductDetail'
import CommentInput from './components/comment/entry/CommentInput'


ReactDOM.render(
  <ApolloProvider client={client}>
    <Fragment>
      <CommentInput />
      <Card />
      {/* <ProductDetail /> */}
    </Fragment>
  </ApolloProvider>,
  document.querySelector('#app')
)

module.hot.accept()
