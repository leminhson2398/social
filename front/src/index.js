import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
const client = new ApolloClient({ uri: 'http://localhost:8000/graphql/' })
import CommentInput from './components/comment/entry/CommentInput'
import ActionButton from './components/button/action/ActionButton'
import SocialButton from './components/button/social/Social'
import ProductCard from './components/product/Card'


ReactDOM.render(
  <ApolloProvider client={client}>
    <Fragment>
      <ProductCard />
      <CommentInput />
      <ActionButton tooltip="Like" iconName="like" tooltipPlacement="top" border={true} size={34} />
      <ActionButton tooltip="Dislike" iconName="dislike" tooltipPlacement="top" size={30} />
      <ActionButton tooltip="Share" iconName="share" tooltipPlacement="top" />
      <ActionButton tooltip="Comment" iconName="comment" tooltipPlacement="top" />
      <ActionButton tooltip="View More" iconName="viewmore" tooltipPlacement="top" />
      <SocialButton tooltip="Twitter" socialName="twitter" size={30} />
      <SocialButton tooltip="Embed" socialName="embed" size={30} />
    </Fragment>
  </ApolloProvider>,
  document.querySelector('#app')
)

module.hot.accept()
