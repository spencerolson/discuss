import React from "react"
import ReactDOM from "react-dom"
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Typography from '@material-ui/core/Typography'
import MaterialSlider from '@material-ui/lab/Slider'

const styles = {
  sliderThumb: {
    height: '22px',
    width: '22px'
  },
};

class ScytheSlider extends React.Component {
  render() {
    return(
      <div style={{ padding: '10px 20px', width: '250px' }}>
        <Typography style={{ padding: '10px 0' }} id={this.props.id}>{this.props.label}: {this.props.value}{this.props.postLabel && ` ${this.props.postLabel}`}</Typography>
        <MaterialSlider
          aria-labelledby={this.props.id}
          classes={{ thumb: classNames(this.props.classes.sliderThumb, this.props.className) }}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={1}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ScytheSlider)