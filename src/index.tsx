import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils";
import AuthProvider from "./features/auth/Context/authContext";
import { Provider } from "react-redux";
import store from "./redux/store";
ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Provider store={store}>
        <AuthProvider>
          <App></App>
        </AuthProvider>
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
