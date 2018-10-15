import React from "react"
import ReactDOM from "react-dom"
import CssBaseline from '@material-ui/core/CssBaseline';
import RecordGame from "./RecordGame"

function App(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <RecordGame csrfToken={props.csrfToken}/>
    </React.Fragment>
  );
}

const container = document.getElementById("record-game")
if (container) {
  ReactDOM.render(<App csrfToken={container.dataset.token}/>, container)
}
