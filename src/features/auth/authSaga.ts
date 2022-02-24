import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, fork, take } from "redux-saga/effects";
import { ACCESS_TOKEN } from "../../constant";
import { authActions, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
  yield delay(300);
  console.log("handleLogin");

  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(payload));
  //redirect to admin
}
function* handleLogout() {
  console.log("handleLogout");

  yield delay(300);
  localStorage.removeItem(ACCESS_TOKEN);
  //redirect to login
}
function* watchLoginFlow() {
  while (true) {
    console.log("watchLoginFlow");

    const isLogged = Boolean(localStorage.getItem(ACCESS_TOKEN));
    if (!isLogged) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type,
      );
      yield fork(handleLogin, action.payload);
    }
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
