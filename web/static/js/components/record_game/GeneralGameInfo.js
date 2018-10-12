import React from "react"
import ReactDOM from "react-dom"
import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/lab/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Moment from 'moment'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

class StepSlider extends React.Component {
  render() {
    return (
      <div>
        <Slider
          value={this.props.playerCount}
          min={2}
          max={7}
          step={1}
          onChange={this.props.handlePlayerCountChanged}
        />
      </div>
    );
  }
}

function DatePicker() {
  return (
    <form noValidate>
      <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue={Moment().format("YYYY-MM-DD")}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}


export default class GeneralGameInfo extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayerDropdown = this.renderPlayerDropdown.bind(this)
    this.renderPlayerDropdowns = this.renderPlayerDropdowns.bind(this)
  }

  renderPlayerDropdown(i) {
    const options = Object.keys(this.props.players).map((id) => {
      const player = this.props.players[id]
      return <option key={`player_${player.id}_${i}`} value={player.id} disabled={player.selected}>{player.name}</option>
    })

    return (
      <div key={`player_${i}`}>
        <select required onChange={this.props.handlePlayerSelected} defaultValue="">
          <option key={`default_${i}`} disabled value="">Select a Name</option>
          {options}
        </select>
      </div>
    )
  }

  renderPlayerDropdowns() {
    const dropdowns = [];
    for(let i=1; i <= this.props.playerCount; i++) {
      dropdowns.push(this.renderPlayerDropdown(i))
    }

    return dropdowns;
  }

  render() {
    return (
      <div>
        <div style={{ padding: '10px', width: '250px' }}>
          <Typography style={{ padding: '10px 0' }} id="player-count-label">{this.props.playerCount} Players</Typography>
          <StepSlider
            handlePlayerCountChanged={this.props.handlePlayerCountChanged}
            playerCount={this.props.playerCount}
            aria-labelledby="player-count-label"
          />
        </div>

        <FormControl style={{ margin: '10px' }}>
          <InputLabel htmlFor="player-select">Structure Bonus Tile</InputLabel>
          <Select
            value={this.props.structureBonusTile.name}
            onChange={this.props.handleStructureBonusTileChanged}
            style={{ width: '200px' }}
            inputProps={{
              player: 'player',
              id: 'player-select',
            }}
          >
            <option value="" disabled/>
            {this.props.structureBonusTiles.map(t => <option key={t.name} value={t.name}>{t.text}</option>)}
          </Select>
        </FormControl>

        <div style={{ padding: '10px', width: '200px' }}>
          <DatePicker />
        </div>
      </div>
    )
  }
}

