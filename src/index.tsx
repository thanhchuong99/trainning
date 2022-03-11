import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils";
import AuthProvider from "./features/auth/Context/authContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
            <App></App>
            <ReactQueryDevtools position="bottom-right" />
          </AuthProvider>
        </Provider>
      </QueryClientProvider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
