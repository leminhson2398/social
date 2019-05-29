import React, { Fragment } from 'react'
import Signing from './components/auth/Signing'
// import AuthUser from './components/GetdataTest'
import ProductCard from './components/product/card/Card'
// import Assesment from './components/product/detail/Assesment'
import ProductEditor from './components/product/editor/Editor'
// import SwipeableTextMobileStepper from './components/product/detail/SwipeViewer'
// import ImageGallery from './components/gallery/ImageGallery'
import ProductDetail from './components/product/detail/ProductDetail'


export default class App extends React.Component {
  render() {
    return (
      <Fragment>
        <ProductCard />
        <ProductEditor />
        <Signing />
        <ProductDetail />
        {/* <SwipeableTextMobileStepper /> */}
        {/* <ImageGallery /> */}
      </Fragment>
    )
  }
}
