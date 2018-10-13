import React from "react"
import ReactDOM from "react-dom"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import StarIcon from '@material-ui/icons/Star'

export default class SummaryTab extends React.Component {
  render() {
    const comparePlayers = (a, b) => {
      if (a.total > b.total) return -1
      if (a.total < b.total) return 1
      return 0
    }
    const rankedPlayers = this.props.playerData.sort(comparePlayers)
    return (
      <List component="nav">
        {
          rankedPlayers.map((player, index) => (
            <ListItem key={`ranked_player_${index}`} button>
              { index === 0 &&
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
              }
              <ListItemText inset primary={`${index + 1}. ${player.faction.toUpperCase()} (${player.name}) $${player.total} `} />
            </ListItem>
          ))
        }
      </List>
    )
  }
}

