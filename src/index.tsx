import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import LoginForm from "./components/Login/LoginForm";
import NotFound from "./components/Notfound/NotFound";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import TodoApp from "./components/TodoApp";
import Home from "./components/Home/Home";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="login" element={<LoginForm />}></Route>
            <Route path="todo" element={<TodoApp />}></Route>
          </Route>
          {/* No other routes match */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
