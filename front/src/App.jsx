import React, { Fragment } from 'react'
import Signing from './components/auth/Signing'
// import AuthUser from './components/GetdataTest'
import ProductCard from './components/product/card/Card'
// import Assesment from './components/product/detail/Assesment'
import ProductEditor from './components/product/editor/Editor'
// import SwipeableTextMobileStepper from './components/product/detail/SwipeViewer'
import ProductDetail from './components/product/detail/ProductDetail'
import 'quill/dist/quill.core.css'



export default class App extends React.Component {
  render() {
    return (
      <Fragment>
        <ProductCard />
        <ProductEditor />
        <Signing />
        <ProductDetail />
        {/* <SwipeableTextMobileStepper /> */}
      </Fragment>
    )
  }
}
