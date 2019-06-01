import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import InputBase from '@material-ui/core/InputBase'
import ButtonIcon from '../../button/icon/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import PropsType from 'prop-types'
// styles
import selectStyle from './categoryStyle'


// you must delete the test constant below in production mode.
const test = ['first one', 'second one', 'this is the third', 'fourth', 'fifth', 'sixth', 'This is seventh', 'And the eighth', 'You can see this is the tenth and you can see']


function CategorySelector({ openOrNot, ...other }) {

  // styles
  const classes = makeStyles(selectStyle)()

  const [overall, changeState] = useState({
    selectValues: test,
    findText: '',
    itemOverIndex: -1,
  })
  let { findText, selectValues, itemOverIndex } = overall
  let defaultValuesHolder = test

  // set values ofter rendering
  // useEffect(() => { defaultValuesHolder = test }, [])

  return (
    <Collapse className={classes.selector} {...other} in={openOrNot}>
      <div className={classes.area1}>
        <InputBase
          className={classes.search}
          placeholder='Search category'
          type='text'
          value={findText}
          onChange={(e) => {
            let matchSelectValues = defaultValuesHolder.filter(item => (
              String(item).toLowerCase().includes(
                String(e.target.value).toLowerCase().trim()
              )
            ))
            changeState({ findText: e.target.value, selectValues: matchSelectValues.length ? matchSelectValues : [] })
          }}
          endAdornment={
            <InputAdornment position="end" onClick={() => changeState({ findText: '', selectValues: defaultValuesHolder })}>
              <ButtonIcon btnType='fab20' iconName='close' title='Clear' style={{ boxShadow: 'none' }} />
            </InputAdornment>
          }
          // onkeypress for navigating through items
          // onKeyDown={(e) => {
          //   if (e.keyCode === 40) {
          //     // arrow key down
          //     changeState({ ...overall, itemOverIndex: (itemOverIndex + 1) % selectValues.length })
          //   } else if (e.keyCode === 38) {
          //     changeState({ ...overall, itemOverIndex: Math.abs((itemOverIndex - 1)) % selectValues.length })
          //   }
          // }}
        />
      </div>
      <div className={classes.area2}>
        {selectValues.length ? (
          selectValues.map((item, index) => (
            <div key={index}>
              <span className={`${classes.selectItem} ${itemOverIndex === index ? classes.hoverSelectItem : ''}`}>{item}</span>
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

CategorySelector.propsTypes = {
  openOrNot: PropsType.bool,
  other: PropsType.object,
}

export default CategorySelector
