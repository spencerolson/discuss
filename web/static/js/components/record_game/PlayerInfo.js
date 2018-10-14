import React from "react"
import ReactDOM from "react-dom"
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

import Slider from './Slider'

const styles = {
  sliderThumb: {
    height: '18px',
    width: '18px'
  },
};

class PlayerInfo extends React.Component {
  handlePlayerChange = ({ target: { value } }) => {
    this.props.handlePlayerDataChange(this.props.selectedTab, "id", value)
  }

  handleFactionChange = ({ target: { value } }) => {
    this.props.handlePlayerDataChange(this.props.selectedTab, "faction", value)
  }

  handlePopularityChange = (event, value) => {
    this.props.handlePlayerDataChange(this.props.selectedTab, "popularity", value)
  }

  handleStarsChange = (event, value) => {
    this.props.handlePlayerDataChange(this.props.selectedTab, "stars", value)
  }

  handleTerritoriesChange = (event, value) => {
    this.props.handlePlayerDataChange(this.props.selectedTab, "territories", value)
  }

  handlePairsOfResourcesChange = (event, value) => {
    this.props.handlePlayerDataChange(this.props.selectedTab, "pairsOfResources", value)
  }

  handleStructureBonusCountChange = (event, value) => {
    this.props.handlePlayerDataChange(this.props.selectedTab, "structureBonusCount", value)
  }

  handleCoinsInHandChange = (event, value) => {
    this.props.handlePlayerDataChange(this.props.selectedTab, "coinsInHand", value)
  }

  starsCalc = () => {
    const data = this.props.playerData
    const total = data.stars * this.props.multipliers(this.props.selectedTab).stars
    if (total > 0) {
      return `($${total})`
    }
    return ''
  }

  territoriesCalc = () => {
    const data = this.props.playerData
    const total = data.territories * this.props.multipliers(this.props.selectedTab).territories
    if (total > 0) {
      return `($${total})`
    }
    return ''
  }

  pairsOfResourcesCalc = () => {
    const data = this.props.playerData
    const total = data.pairsOfResources * this.props.multipliers(this.props.selectedTab).pairsOfResources
    if (total > 0) {
      return `($${total})`
    }
    return ''
  }

  structureBonusCalc = () => {
    const data = this.props.playerData
    const total = this.props.structureBonusTile.scoring[data.structureBonusCount] || 0
    if (total > 0) {
      return `($${total})`
    }
    return ''
  }

  coinsInHandCalc = () => {
    const data = this.props.playerData
    return `(${data.coinsInHand} coins in hand)`
  }

  render() {
    const data = this.props.playerData
    const structureTileText = this.props.structureBonusTile.text
    const displayStructureText = `Buildings ${structureTileText.charAt(0).toLowerCase() + structureTileText.slice(1)}`
    return (
      <div>
        <div>
          <FormControl style={{ margin: '10px 20px' }}>
            <InputLabel htmlFor="player-select">Player</InputLabel>
            <Select
              native
              value={data.id}
              onChange={this.handlePlayerChange}
              style={{ width: '200px' }}
              inputProps={{
                player: 'player',
                id: 'player-select',
              }}
            >
              <option value="" disabled/>
              {this.props.users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl style={{ margin: '10px 20px' }}>
            <InputLabel htmlFor="faction-select">Faction</InputLabel>
            <Select
              native
              value={data.faction}
              onChange={this.handleFactionChange}
              style={{ width: '200px' }}
              inputProps={{
                faction: 'faction',
                id: 'faction-select',
              }}
            >
              <option value="" disabled/>
              <option value="albion">Albion</option>
              <option value="crimea">Crimea</option>
              <option value="nordic">Nordic</option>
              <option value="polania">Polania</option>
              <option value="rusviet">Rusviet</option>
              <option value="saxony">Saxony</option>
              <option value="togawa">Togawa</option>
            </Select>
          </FormControl>


          <Slider min={0} max={8} value={data.popularity} onChange={this.handlePopularityChange} label="Popularity" postLabel="" id="popularity-label" />
          <Slider min={0} max={6} value={data.stars} onChange={this.handleStarsChange} label="Stars" postLabel={this.starsCalc()} id="stars-label" />
          <Slider min={0} max={25} value={data.territories} onChange={this.handleTerritoriesChange} label="Territories" postLabel={this.territoriesCalc()} id="territories-label" />
          <Slider min={0} max={20} value={data.pairsOfResources} onChange={this.handlePairsOfResourcesChange} label="Pairs of Resources" postLabel={this.pairsOfResourcesCalc()} id="pairsOfResources-label" />
          <Slider min={this.props.structureBonusTile.min} max={this.props.structureBonusTile.max} value={data.structureBonusCount} onChange={this.handleStructureBonusCountChange} label={displayStructureText} postLabel={this.structureBonusCalc()} id="structureBonusCount-label" />
          <Slider min={0} max={100} value={data.coinsInHand} onChange={this.handleCoinsInHandChange} label="Coins in Hand" postLabel="" id="coinsInHand-label" />

          <div style={{ padding: '10px 20px', width: '250px' }}>
            <Typography variant="h5" component="h3">
              Total: ${data.total}
            </Typography>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PlayerInfo)