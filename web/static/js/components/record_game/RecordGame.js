import React from "react"
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import GeneralGameInfo from "./GeneralGameInfo"
import PlayerInfo from './PlayerInfo'
import SummaryTab from './SummaryTab'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default class RecordGame extends React.Component {
  constructor(props) {
    super(props)

    this.handlePlayerCountChanged = this.handlePlayerCountChanged.bind(this)
    this.handlePlayerSelected = this.handlePlayerSelected.bind(this)
    const playerData = {}
    for (let i = 1; i < 8; i++) {
      playerData[i] = {
        id: '',
        name: `Player ${i}`,
        faction: '',
        popularity: 0,
        stars: 0,
        territories: 0,
        pairsOfResources: 0,
        structureBonusCount: 0,
        coinsInHand: 0,
        total: 0
      }
    }

    const structureBonusTiles = [
      { name: 'adjacentToEncounters', text: 'Adjacent to Encounters', min: 0, max: 7, scoring: { 0: 0, 1: 2, 2: 4, 3: 4, 4: 6, 5: 6, 6: 9, 7: 9 } },
      { name: 'adjacentToLakes', text: 'Adjacent to Lakes', min: 0, max: 7, scoring: { 0: 0, 1: 2, 2: 4, 3: 4, 4: 6, 5: 6, 6: 9, 7: 9 } },
      { name: 'adjacentToTunnels', text: 'Adjacent to Tunnels', min: 0, max: 6, scoring: { 0: 0, 1: 2, 2: 4, 3: 4, 4: 6, 5: 6, 6: 9 } },
      { name: 'inARow', text: 'In a Row', min: 0, max: 4, scoring: { 0: 0, 1: 2, 2: 4, 3: 6, 4: 9 } },
      { name: 'onFarmsOrTundras', text: 'On Farms or Tundras', min: 0, max: 4, scoring: { 0: 0, 1: 2, 2: 4, 3: 6, 4: 9 } },
      { name: 'onTunnels', text: 'On Tunnels', min: 0,  max: 4, scoring: { 0: 0, 1: 2, 2: 4, 3: 6, 4: 6 } }
    ]
    const users = { 14: { id: '14', name: "John" }, 23: { id: '23', name: "Danny" }, 17: { id: '17', name: "Tim" }, 93: { id: '93', name: "Spencer" } }
    this.state = { playerCount: 3, selectedTab: 0, structureBonusTile: { name: '', text: 'Structure Bonus Tile Count', min: 0, max: 7, scoring: {} }, playerData, users, structureBonusTiles }
  }

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  handleNextTab = () => {
    this.setState({ selectedTab: this.state.selectedTab + 1 })
  }

  handlePreviousTab = () => {
    this.setState({ selectedTab: this.state.selectedTab - 1 })
  }

  handlePlayerDataChange = (selectedTab, property, value) => {
    const playerData = { ...this.state.playerData[selectedTab], [property]: value }
    if (property === "id") {
      playerData.name = this.state.users[value].name
    }
    this.setState({ playerData: { ...this.state.playerData, [selectedTab]: playerData } }, () => {
      const pData = { ...this.state.playerData[selectedTab], total: this.calculateTotal(selectedTab) }
      this.setState({ playerData: { ...this.state.playerData, [selectedTab]: pData } })
    })
  }

  handleStructureBonusTileChanged = ({ target: { value } }) => {
    const tile = this.state.structureBonusTiles.find(t => t.name === value)
    this.setState({ structureBonusTile: tile }, () => {
      const playerData = {}
      Object.keys(this.state.playerData).forEach(tabId => {
        const data = this.state.playerData[tabId]
        playerData[tabId] = { ...data, total: this.calculateTotal(tabId) }
      })
      this.setState({ playerData })
    })
  }

  handleSubmit = () => {
  }

  numberOfTabs = () => {
    return this.state.playerCount + 1
  }

  handlePlayerCountChanged(event, playerCount) {
    this.setState({ playerCount })
  }

  handlePlayerSelected({ target: { value: id } }) {
    const selectedPlayer = { ...this.state.players[id], selected: true }
    this.setState({ players: { ...this.state.players, [id]: selectedPlayer } })
  }

  calculateTotal = (tabId) => {
    const data = this.state.playerData[tabId]

    const multipliers = this.multipliers(tabId)
    return (data.stars * multipliers.stars) +
      (data.territories * multipliers.territories) +
      (data.pairsOfResources * multipliers.pairsOfResources) +
      (this.state.structureBonusTile.scoring[data.structureBonusCount] || 0) +
      data.coinsInHand
  }

  multipliers = (tabId) => {
    const tier = Math.ceil(this.state.playerData[tabId].popularity / 6) || 1;
    return {
      1: { stars: 3, territories: 2, pairsOfResources: 1 },
      2: { stars: 4, territories: 3, pairsOfResources: 2 },
      3: { stars: 5, territories: 4, pairsOfResources: 3 }
    }[tier]
  }

  activePlayers() {
    const players = []
    for (let i = 1; i <= this.state.playerCount; i++) {
      players.push(this.state.playerData[i])
    }
    return players
  }

  renderPlayerTabs() {
    const tabs = []
    for (let i = 1; i <= this.state.playerCount; i++) {
      tabs.push(<Tab key={`player_${i}`} label={this.state.playerData[i].name} />)
    }
    return tabs
  }

  renderPlayerPanels() {
    const panels = []
      Object.keys(this.state.players).forEach((id) => {
        const player = this.state.players[id]
        if (player.selected) {
          const panel = (
            <div className="mdl-tabs__panel" id={`player_${player.id}`}>
              This is the panel for <span>{player.name}</span>
            </div>
          )
          panels.push(<a href={`#${player.name}`} className="mdl-tabs__tab">{player.name}</a>)
        }
      })
    return panels
  }

  render() {
    console.log('totals are', Object.values(this.state.playerData).map(o => o.total))
    return (
      <div>
        <AppBar position="static">
          <Tabs value={this.state.selectedTab} onChange={this.handleChange}>
            <Tab key="general" label="General" />
            {this.renderPlayerTabs()}
            <Tab key="summary" label="Summary" />
          </Tabs>
        </AppBar>

        <div style={{ height: '100%' }}>
          {this.state.selectedTab === 0 &&
            <TabContainer>
              <GeneralGameInfo
                handlePlayerCountChanged={this.handlePlayerCountChanged}
                handleStructureBonusTileChanged={this.handleStructureBonusTileChanged}
                playerCount={this.state.playerCount}
                structureBonusTiles={this.state.structureBonusTiles}
                structureBonusTile={this.state.structureBonusTile}
              />
            </TabContainer>
          }

          {(this.state.selectedTab === this.numberOfTabs()) &&
            <TabContainer>
              <SummaryTab playerData={this.activePlayers()}/>
            </TabContainer>
          }

          {(this.state.selectedTab !== 0) && (this.state.selectedTab !== this.numberOfTabs()) &&
            <TabContainer>
              <PlayerInfo
                calculateTotal={this.calculateTotal}
                multipliers={this.multipliers}
                handlePlayerDataChange={this.handlePlayerDataChange}
                playerData={this.state.playerData[this.state.selectedTab]}
                selectedTab={this.state.selectedTab}
                users={Object.values(this.state.users)}
                structureBonusTile={this.state.structureBonusTile}
              />
            </TabContainer>
          }
        </div>

        <div>
          {(this.state.selectedTab !== 0) &&
            <Button
              variant="contained"
              color="primary"
              onClick={this.handlePreviousTab}
            >
              Back
            </Button>
          }

          {(this.state.selectedTab !== this.numberOfTabs()) &&
            <Button
              style={{ float: 'right' }}
              variant="contained"
              color="primary"
              onClick={this.handleNextTab}
            >
              Next
            </Button>
          }

          {(this.state.selectedTab === this.numberOfTabs()) &&
            <Button
              style={{ float: 'right' }}
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          }
        </div>
      </div>
    )
  }
}
