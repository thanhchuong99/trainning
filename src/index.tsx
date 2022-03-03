import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils";
ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App></App>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
