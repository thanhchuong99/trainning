import { Call } from "@mui/icons-material";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  call,
  delay,
  put,
  StrictEffect,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import customerApi from "../../../api/customerApi";
import { Customer, ListParams, ListResponse } from "../../../models";
import { history } from "../../../utils";
import { handleError } from "../../../utils/handleError";
import { customerActions } from "../slice/customerSlice";
import { customersActions } from "../slice/customersSlice";
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER_BY_ID,
  FILTER_CUSTOMER,
  GET_CUSTOMERS,
  GET_CUSTOMER_BY_ID,
  UPDATE_CUSTOMER_BY_ID,
} from "../types";

export function* getCustomersSaga(action: PayloadAction<ListParams>) {
  try {
    const customers: ListResponse<Customer[]> = yield call(customerApi.getAll, {
      q: action.payload,
    });
    yield put(customersActions.getCustomer(customers));
  } catch (err: any) {
    handleError(err);
  }
}

export function* getCustomerByIdSaga(action: PayloadAction<string>) {
  try {
    yield put(customersActions.setLoading(true));

    yield delay(500);
    const customer: ListResponse<Customer> = yield call(
      customerApi.getById,
      action.payload,
    );
    yield put(customersActions.setLoading(false));

    yield put(customerActions.setCustomerSlice(customer));
  } catch (err) {
    handleError(err);
    history.push("login");
  }
}
export function* createCustomerSaga(action: PayloadAction<Customer>) {
  try {
    yield put(customersActions.setLoading(true));

    yield delay(500);
    yield call(customerApi.add, action.payload);
    yield put(customersActions.addCustomer(action.payload));
  } catch (err) {
    handleError(err);
    history.push("login");
  }
}

export function* updateCustomerSaga(action: PayloadAction<Customer>) {
  try {
    yield put(customersActions.setLoading(true));

    yield delay(500);

    yield call(customerApi.update, action.payload);
    yield put(customersActions.editCustomer(action.payload));
  } catch (err) {
    handleError(err);
    history.push("login");
  }
}

export function* deleteCustomerByIdSaga(action: PayloadAction<string>) {
  try {
    yield put(customersActions.setLoading(true));
    yield delay(500);
    yield call(customerApi.remove, action.payload);
    yield put(customersActions.deleteCustomer(action.payload));
  } catch (err) {
    yield put(customersActions.setLoading(false));
    handleError(err);
  }
}
export function* filterSaga(action: PayloadAction<ListParams>) {
  yield delay(500);
  yield put({ type: GET_CUSTOMERS, payload: action.payload });
}
export function* watchCustomerAsync(): Generator<StrictEffect> {
  yield takeEvery(GET_CUSTOMERS, getCustomersSaga);
  yield takeEvery(GET_CUSTOMER_BY_ID, getCustomerByIdSaga);
  yield takeEvery(CREATE_CUSTOMER, createCustomerSaga);
  yield takeEvery(UPDATE_CUSTOMER_BY_ID, updateCustomerSaga);
  yield takeEvery(DELETE_CUSTOMER_BY_ID, deleteCustomerByIdSaga);
  yield takeLatest(FILTER_CUSTOMER, filterSaga);
}
