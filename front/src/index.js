import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
const client = new ApolloClient({ uri: 'http://localhost:8000/graphql/' })
import CommentInput from './components/comment/entry/CommentInput'
import ProductCard from './components/product/Card'
// import ProductDetail from './components/product/ProductDetail'
// import Test from './components/GetdataTest'


ReactDOM.render(
  <ApolloProvider client={client}>
    <Fragment>
      <CommentInput />
      <ProductCard />
    </Fragment>
  </ApolloProvider>,
  document.querySelector('#app')
)

module.hot.accept()
