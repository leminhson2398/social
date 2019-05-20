import React, { Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog'
// import classNames from 'classnames'
// import { withStyles } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import DialogContentText from '@material-ui/core/DialogContentText'


class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
      scroll: 'paper',
    }
  }

  openDialog = (scroll) => () => {
    this.setState({ dialogOpen: true, scroll })
  }

  closeDialog = () => {
    this.setState({
      dialogOpen: false
    })
  }

  render() {
    // let { classes } = this.props
    return (
      <Fragment>
        <Button onClick={this.openDialog('paper')}>scroll=paper</Button>
        <Button onClick={this.openDialog('body')}>scroll=body</Button>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
          scroll={this.state.scroll}
          aria-labelledby="product-detail-scroll-dialog"
          maxWidth="md"
        >
          <DialogContent>
            <DialogContentText>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                  facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
                  at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                  sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
                  nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur
                  et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras
                  mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                  egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                  lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
                  sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                  Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                  consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                  egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                  lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
                  sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                  Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                  consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                  egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                  lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
                  sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                  Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                  consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                  egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                  lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
                  sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                  Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                  consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                  egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                  lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
                  sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                  Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.closeDialog} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}


export default ProductDetail
