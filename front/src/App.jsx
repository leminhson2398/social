import React, { Fragment } from 'react'
// import Signing from './components/auth/Sign'
// import AuthUser from './components/GetdataTest'
import ProductCard from './components/product/Card'
import Assesment from './components/product/detail/Assesment'
import ProductEditor from './components/product/ProductEditor'

export default class App extends React.Component {
  render() {
    return (
      <Fragment>
        <ProductCard />
        {/* <Signing /> */}
        <ProductEditor />
        <Assesment />
      </Fragment>
    )
  }
}
