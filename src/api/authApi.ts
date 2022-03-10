import { User, ResponseData, LoginResponse } from "../models";
import axiosClient from "./axiosClient";
const authApi = {
  login(data: User): Promise<LoginResponse> {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
  logout(data: string): any {
    const url = "/auth/logout";
    return axiosClient.post(url, { token: data });
  },
  refreshToken(data: string): any {
    const url = "/auth/refreshToken";
    return axiosClient.post(
      url,
      { token: data },
      {
        withCredentials: true,
      },
    );
  },
  checkAuth(data: any): Promise<ResponseData> {
    const url = "/auth/check-auth";
    return axiosClient.post(url, { access_token: data });
  },
};
export default authApi;
