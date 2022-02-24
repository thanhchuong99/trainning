import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models";
import { RootState } from "../../redux/store";
export interface AuthState {
  isLogged: boolean;
  logging?: boolean;
  currentUser?: User;
}
export interface LoginPayload {
  email: string;
  password: string;
}
const initialState: AuthState = {
  isLogged: false,
  logging: false,
  currentUser: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.isLogged = true;
      state.currentUser = action.payload;
    },
    loginFail(state, action: PayloadAction<string>) {
      state.logging = false;
    },
    logout(state) {
      state.isLogged = false;
      state.currentUser = undefined;
    },
  },
});
//actions
export const authActions = authSlice.actions;
//seclector
export const selectIslogged = (state: RootState) => state.auth.isLogged;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectLogging = (state: RootState) => state.auth.logging;

// reducer
const authReducer = authSlice.reducer;
export default authReducer;
