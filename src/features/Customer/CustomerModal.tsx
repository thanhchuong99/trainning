import { nanoid } from "@reduxjs/toolkit";
import { Button, Form, Input, Modal, Select, Tag } from "antd";
import { Customer } from "../../models";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { validateMessages } from "../../utils";
import { selectCustomer } from "./slice/customerSlice";
import { CREATE_CUSTOMER, UPDATE_CUSTOMER_BY_ID } from "./types";

interface ICustomerModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const CustomerModal: React.FunctionComponent<ICustomerModalProps> = (props) => {
  const { setIsModalVisible, isModalVisible } = props;
  const dispatch = useAppDispatch();

  const handleOk = (value: Customer) => {
    value.id
      ? dispatch({ type: UPDATE_CUSTOMER_BY_ID, payload: value })
      : dispatch({
          type: CREATE_CUSTOMER,
          payload: { ...value, id: nanoid(8) },
        });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const initialValue = useAppSelector(selectCustomer);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 10, offset: 14 },
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="Edit Modal"
        visible={isModalVisible}
        onCancel={handleCancel}
        okButtonProps={{ danger: true }}
        footer={[]}
      >
        <Form
          validateMessages={validateMessages}
          onFinish={handleOk}
          initialValues={initialValue}
          {...formItemLayout}
        >
          {initialValue.id && (
            <Form.Item label="ID" name="id">
              <Input disabled />
            </Form.Item>
          )}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value={true} label="Active">
                <Tag color="blue">Active</Tag>
              </Select.Option>
              <Select.Option value={false} label="InActive">
                <Tag color="red">InActive</Tag>
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button key="cancel" type="primary" htmlType="submit" danger>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              style={{ marginLeft: "12px" }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomerModal;
