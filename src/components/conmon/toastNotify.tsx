import { notification } from "antd";

export const openNotification = (title: string, des: string) => {
  notification["error"]({
    message: title,
    description: des,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};
