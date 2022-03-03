import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import { watchCustomerAsync } from "../features/Customer/saga/customerSaga";
export default function* rootSaga() {
  yield all([authSaga(), watchCustomerAsync()]);
}
