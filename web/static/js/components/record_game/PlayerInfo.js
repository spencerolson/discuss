import React from "react"
import ReactDOM from "react-dom"
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Slider from '@material-ui/lab/Slider'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

export default class PlayerInfo extends React.Component {
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
          <FormControl style={{ margin: '10px 0' }}>
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
          <FormControl style={{ margin: '10px 0' }}>
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


          <div style={{ padding: '10px 0px', width: '250px' }}>
            <Typography style={{ padding: '10px 0' }} id="popularity-label">Popularity: {data.popularity}</Typography>
              <Slider
                value={data.popularity}
                min={0}
                max={18}
                step={1}
                onChange={this.handlePopularityChange}
              />
          </div>

          <div style={{ padding: '10px 0px', width: '250px' }}>
            <Typography style={{ padding: '10px 0' }} id="stars-label">
              Stars: {data.stars} {this.starsCalc()}
            </Typography>
              <Slider
                value={data.stars}
                min={0}
                max={6}
                step={1}
                onChange={this.handleStarsChange}
              />
          </div>

          <div style={{ padding: '10px 0px', width: '250px' }}>
            <Typography style={{ padding: '10px 0' }} id="territories-label">
              Territories: {data.territories} {this.territoriesCalc()}
            </Typography>
              <Slider
                value={data.territories}
                min={0}
                max={25}
                step={1}
                onChange={this.handleTerritoriesChange}
              />
          </div>

          <div style={{ padding: '10px 0px', width: '250px' }}>
            <Typography style={{ padding: '10px 0' }} id="pairsOfResources-label">
              Pairs of Resources: {data.pairsOfResources} {this.pairsOfResourcesCalc()}
            </Typography>
              <Slider
                value={data.pairsOfResources}
                min={0}
                max={20}
                step={1}
                onChange={this.handlePairsOfResourcesChange}
              />
          </div>

          <div style={{ padding: '10px 0px', width: '250px' }}>
            <Typography style={{ padding: '10px 0' }} id="structureBonusCount-label">
              {displayStructureText}: {data.structureBonusCount} {this.structureBonusCalc()}
            </Typography>
              <Slider
                value={data.structureBonusCount}
                min={this.props.structureBonusTile.min}
                max={this.props.structureBonusTile.max}
                step={1}
                onChange={this.handleStructureBonusCountChange}
              />
          </div>

          <div style={{ padding: '10px 0px', width: '250px' }}>
            <Typography style={{ padding: '10px 0' }} id="coinsInHand-label">Coins in Hand: {data.coinsInHand}</Typography>
            <Slider
              value={data.coinsInHand}
              min={0}
              max={100}
              step={1}
              onChange={this.handleCoinsInHandChange}
            />
          </div>

          <div style={{ padding: '10px 0px', width: '250px' }}>
            <Typography variant="h5" component="h3">
              Total: ${data.total}
            </Typography>
          </div>
        </div>
      </div>
    )
  }
}

