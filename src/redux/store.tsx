import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "../components/TodoApp/Filters/FiltersSlice";
import todoListSlice from "../components/TodoApp/TodoList/todoListSlice";

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoListSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
