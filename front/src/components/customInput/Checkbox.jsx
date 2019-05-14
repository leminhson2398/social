import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
// import entryStyle from '../../static/style/entry'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import PropTypes from 'prop-types'


class Checkbox extends React.Component {

  render() {
    let { value, label } = this.props
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={true}
            value={value}
            color="primary"
          />
        }
        label={label}
      />
    )
  }
}

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default Checkbox
