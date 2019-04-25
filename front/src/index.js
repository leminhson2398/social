import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
const client = new ApolloClient({ uri: 'http://localhost:8000/graphql/' })
import CommentInput from './components/comment/entry/CommentInput'
import ActionButton from './components/button/action/ActionButton'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Fragment>
      <CommentInput />
      <ActionButton tooltip="Like" iconName="like" tooltipPlacement="top" border={true}/>
      <ActionButton tooltip="Dislike" iconName="dislike" tooltipPlacement="top"/>
      <ActionButton tooltip="Share" iconName="share" tooltipPlacement="top"/>
      <ActionButton tooltip="Comment" iconName="comment" tooltipPlacement="top"/>
      <ActionButton tooltip="View More" iconName="viewmore" tooltipPlacement="top"/>
    </Fragment>
  </ApolloProvider>,
  document.querySelector('#app')
)

module.hot.accept()
