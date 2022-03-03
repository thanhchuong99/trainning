import { Form, Input, Row, Col, Skeleton, Typography, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectCustomer } from "./slice/customerSlice";
import { selectCustomerLoading } from "./slice/customersSlice";
import { GET_CUSTOMER_BY_ID } from "./types";
export interface CustomerDeTailProps {}

export function CustomerDeTail() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector(selectCustomer);
  const loading = useAppSelector(selectCustomerLoading);

  useEffect(() => {
    dispatch({ type: GET_CUSTOMER_BY_ID, payload: id });
  }, []);
  useEffect(() => {
    form.setFieldsValue(initialValue);
  }, [initialValue]);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Button type="link" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Row justify="center" style={{ marginTop: "60px" }}>
            <Typography.Title type="secondary" level={2}>
              Customer Infomation
            </Typography.Title>
          </Row>
          <Row justify="center" align="middle">
            <Col flex="600px">
              <Form {...formItemLayout} name="register" form={form}>
                <Form.Item label="ID" name="id">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="Name" name="name">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="City" name="city">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="EMail" name="email">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="Status" name="status">
                  <Input readOnly />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
