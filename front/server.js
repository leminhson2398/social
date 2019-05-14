import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


const styles = {
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {}
};

class CheckboxLabels extends React.Component {
  state = {
    checkedA: true
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.checkedA}
            onChange={this.handleChange("checkedA")}
            value="checkedA"
          />
        }
        label="Secondary"
      />
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxLabels);
