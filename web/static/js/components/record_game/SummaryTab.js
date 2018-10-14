import React from "react"
import ReactDOM from "react-dom"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import StarIcon from '@material-ui/icons/Star'
import Tooltip from '@material-ui/core/Tooltip'

export default class SummaryTab extends React.Component {
  detailedInfo(player) {
    return `${(player.faction && player.faction.toUpperCase()) || '[No faction selected]'} + ${(player.playerMat && player.playerMat.toUpperCase()) || '[No player mat selected]'}`
  }

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
            <Tooltip title={this.detailedInfo(player)}>
              <ListItem key={`ranked_player_${index}`} button>
                { index === 0 &&
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                }
                <ListItemText inset primary={`${index + 1}. ${player.name} $${player.total} `} />
              </ListItem>
            </Tooltip>
          ))
        }
      </List>
    )
  }
}

