import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
export interface Error {
  status?: number;
  message?: string;
  title?: string;
}
const initialState: Error = {
  status: undefined,
  message: undefined,
  title: undefined,
};
const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
export const errorActions = errorSlice.actions;
//selector
export const selectError = (state: RootState) => state.error;
// reducer
const errorReducer = errorSlice.reducer;
export default errorReducer;
