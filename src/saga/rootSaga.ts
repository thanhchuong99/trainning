import { all } from "redux-saga/effects";
import { watchCustomerAsync } from "../features/Customer/saga/customerSaga";
export default function* rootSaga() {
  yield all([watchCustomerAsync()]);
}
