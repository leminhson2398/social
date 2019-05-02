import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
const client = new ApolloClient({ uri: 'http://localhost:8000/graphql/' })
import CommentInput from './components/comment/entry/CommentInput'
import ProductCard from './components/product/Card'
import ProductDetail from './components/product/ProductDetail'


ReactDOM.render(
  <ApolloProvider client={client}>
    <Fragment>
      <CommentInput />
      <CommentInput />
      <CommentInput />
      <CommentInput />

      <ProductCard />
      {/* <ProductDetail /> */}
    </Fragment>
  </ApolloProvider>,
  document.querySelector('#app')
)

module.hot.accept()
