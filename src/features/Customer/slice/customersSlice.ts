import { SatelliteAltOutlined } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "../../../models";
import { RootState } from "../../../redux/store";
// export interface CustomerPayload {
//   id: string;
// }
export interface CustomerState {
  loading: boolean;
  customers: Customer[];
}
const initialState: CustomerState = {
  loading: true,
  customers: [
    { id: "", name: "", email: "", phone: 0, city: "", status: true },
  ],
};
const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
    getCustomer: (state, action) => {
      state.customers = action.payload;
      state.loading = false;
      return state;
    },
    addCustomer: (state, action) => {
      state.loading = false;
      state.customers.push(action.payload);
      return state;
    },
    editCustomer: (state, action) => {
      state.loading = false;

      state.customers = state.customers.map((i) =>
        i.id === action.payload.id ? action.payload : i,
      );
      return state;
    },
    deleteCustomer: (state, action) => {
      state.loading = false;

      state.customers = state.customers.filter((i) => i.id !== action.payload);
      return state;
    },
  },
});
//actions
export const customersActions = customersSlice.actions;
//seclector
export const selectCustomers = (state: RootState) => {
  return state.customers.customers?.map((data) => ({
    key: data.id,
    id: data.id,
    name: data.name,
    city: data.city,
    phone: data.phone,
    email: data.email,
    status: data.status,
  }));
};
export const selectCustomerLoading = (state: RootState) =>
  state.customers.loading;

// reducer
const customersReducer = customersSlice.reducer;
export default customersReducer;
