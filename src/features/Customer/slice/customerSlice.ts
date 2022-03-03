import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "../../../models";
import { RootState } from "../../../redux/store";
const initialState: Customer = {
  id: "",
  name: "",
  email: "",
  phone: 0,
  city: "",
  status: true,
};
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerSlice: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
export const customerActions = customerSlice.actions;
//selector
export const selectCustomer = (state: RootState) => state.customer;
// reducer
const customerReducer = customerSlice.reducer;
export default customerReducer;
