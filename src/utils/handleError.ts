import { openNotification } from "../components/conmon/toastNotify";
import { history } from "./history";

export const handleError = (err: any) => {
  if (err.response.status === 401) {
    console.log(err.response);
    openNotification("Login session expired", err.response.data.message);
    history.push("/login");
  }
};
