import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import authReducer from "../features/auth/authSlice";
import filtersSlice from "../features/TodoApp/Filters/FiltersSlice";
import todoListSlice from "../features/TodoApp/TodoList/todoListSlice";
import rootSaga from "../saga/rootSaga";
import { createBrowserHistory } from "history";
import customersReducer from "../features/Customer/slice/customersSlice";
import customerReducer from "../features/Customer/slice/customerSlice";
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoListSlice.reducer,
    auth: authReducer,
    customers: customersReducer,
    customer: customerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
