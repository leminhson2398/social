import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import InputBase from '@material-ui/core/InputBase'
import ButtonIcon from '../../button/icon/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
// import PropTypes from 'prop-types'


const selectStyle = () => ({
  selector: {
    padding: 8,
    // position: 'absolute',
    zIndex: 1,
    background: '#ffffff',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: 4,
    // width: '100%',
    position: 'absolute',
    maxHeight: 300,
  },
  search: {
    border: '1px solid #ddd',
    borderRadius: 4,
    padding: 4,
    color: '#676767',
  },
  area1: {
    marginBottom: 8,
  },
  area2: {
    overflowY: 'scroll',
    maxHeight: 200,
    background: 'transparent',
    fontSize: 14,
    color: '#333333',
    '&:hover::-webkit-scrollbar': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar': {
      backgroundColor: 'transparent',
      borderRadius: 0,
      width: 6,
    },
    '&::-webkit-scrollbar-corner': {
      background: 'transparent',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(95, 99, 104, 0.2)',
      backgroundClip: 'padding-box',
      borderRadius: 3,
      padding: '100px 0 0',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
  },
  selectItem: {
    cursor: 'pointer',
    borderRadius: 15,
    padding: 10,
    wordBreak: 'break-word',
    display: 'inline-block',
    '&:hover': {
      background: '#e0dfdf',
    },
  },
})

// you must delete the test constant below in production mode.
const test = ['first one', 'second one', 'this is the third', 'fourth', 'fifth', 'sixth', 'This is seventh', 'And the eighth', 'You can see this is the tenth and you can see']

class CategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      findText: '',
      selectValues: [],
    }
    this.defaultValuesHolder = null // this holds initial prop
  }

  emptyFindtext = () => {
    // this function empty findText
    this.setState({
      findText: '',
      selectValues: this.defaultValuesHolder,
    })
  }

  setFindTextChange = (event) => {
    // this function set findText
    let matchSelectValues = this.defaultValuesHolder.filter(item => (
      String(item).toLowerCase().includes(
        String(event.target.value).toLowerCase().trim()
      )
    ))
    this.setState({
      findText: event.target.value,
      selectValues: matchSelectValues.length ? matchSelectValues : []
    })
  }

  componentDidMount() {
    this.defaultValuesHolder = test
    this.setState({ selectValues: test })
  }

  render() {
    let { classes, openOrNot, ...other } = this.props
    let { findText, selectValues } = this.state

    return (
      <Collapse className={classes.selector} {...other} in={openOrNot}>
        <div className={classes.area1}>
          <InputBase
            className={classes.search}
            placeholder='Search category'
            type='text'
            value={findText}
            onChange={this.setFindTextChange}
            endAdornment={
              <InputAdornment position="end" onClick={this.emptyFindtext}>
                <ButtonIcon btnType='fab20' iconName='close' title='Clear' style={{ boxShadow: 'none' }} />
              </InputAdornment>
            }
          />
        </div>
        <div className={classes.area2}>
          {selectValues.length ? (
            selectValues.map((item, index) => (
              <div key={index}>
                <span className={classes.selectItem}>{item}</span>
              </div>
            ))
          ) : (
              <div>
                <span className={classes.selectItem}>Opps! We found nothing.</span>
              </div>
            )}
        </div>
      </Collapse>
    )
  }
}

export default withStyles(selectStyle)(CategorySelector)
