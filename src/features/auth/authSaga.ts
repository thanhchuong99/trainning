import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, fork, put, take } from "redux-saga/effects";
import { ACCESS_TOKEN } from "../../constant";
import { authActions, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
  yield delay(500);
  console.log("handleLogin");

  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(payload));
  yield put(authActions.loginSuccess(payload));

  //redirect to admin
}
function* handleLogout() {
  yield delay(500);
  console.log("handleLogout");

  localStorage.removeItem(ACCESS_TOKEN);
  //redirect to login
}
function* watchLoginFlow() {
  while (true) {
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
