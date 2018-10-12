import React from "react"
import ReactDOM from "react-dom"
import CssBaseline from '@material-ui/core/CssBaseline';
import RecordGame from "./RecordGame"

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <RecordGame />
    </React.Fragment>
  );
}

const container = document.getElementById("record-game")
if (container) {
  ReactDOM.render(<App />, container)
}
