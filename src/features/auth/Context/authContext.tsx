import { useContext, createContext, useState, useEffect } from "react";
import authApi from "../../../api/authApi";
import { ResponseData } from "../../../models";
import { errorActions, selectError } from "../../../redux/errorSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

type AuthProviderProps = {
  children: React.ReactNode;
};

type authContextProps = {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  isLogged: boolean;
  loading: boolean;
  verifyTokenEffect: () => void;
};
const AuthContext = createContext<authContextProps | null>(null);
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in AuthProvider component");
  }
  return context;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("access_token"),
  );
  let dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const verifyTokenEffect = async () => {
    const token = localStorage.getItem("access_token");

    try {
      if (token) {
        const response: ResponseData = await authApi.checkAuth(token);
        console.log(response);
        if (response.error) {
          dispatch(
            errorActions.setError({
              message: response.message,
              status: response.status,
              title: "Fail",
            }),
          );
          setIsLogged(false);
        } else {
          console.log(isLogged);

          setIsLogged(true);
        }
      } else {
        setIsLogged(false);
      }
    } catch (e: any) {
      setIsLogged(false);
      dispatch(
        errorActions.setError({
          message: "Login Invalid",
          status: e.response.status,
          title: "Fail",
        }),
      );
    }
    setLoading(false);
  };

  async function signIn(username: string, password: string) {
    setLoading(true);
    const res = await authApi
      .login({ username, password })
      .catch(function (error) {
        if (error.response.status === 401) {
          dispatch(
            errorActions.setError({
              message: error.response.data.message,
              status: 401,
              title: "Fail",
            }),
          );
        }
        setLoading(false);
      });
    if (res) {
      setLoading(false);
      console.log(res);
      localStorage.setItem("access_token", res?.access_token);
      localStorage.setItem("refresh_token", res?.refreshToken);

      setIsLogged(true);
    }
  }

  async function signOut() {
    setIsLogged(false);
    localStorage.removeItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      await authApi.logout(refreshToken);
      localStorage.removeItem("refresh_token");
    }
  }

  const value = {
    signIn,
    signOut,
    isLogged,
    loading,
    verifyTokenEffect,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
