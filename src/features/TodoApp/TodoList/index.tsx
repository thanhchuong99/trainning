import { Col, Row, Input, Button, Select, Tag, Form } from "antd";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { todoRemainingSelector } from "../../../redux/selectors";
import Todo from "../Todo";
import todoListSlice from "./todoListSlice";

export interface ITodo {
  id: number;
  name: string;
  priority: string;
  completed: boolean;
}
export interface TodoInput {
  name: string;
  priority: string;
}
export default function TodoList() {
  // const [inputText, setInputText] = useState("");
  // const [priority, setPriority] = useState("Medium");

  const todoList = useSelector(todoRemainingSelector);
  const dispatch = useDispatch();

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputText(e.target.value);
  // };
  // const handleStatusChange = (value: string) => {
  //   setPriority(value);
  // };
  const handleAddButtonClick = (input: TodoInput) => {
    dispatch(
      todoListSlice.actions.addTodo({
        id: uuidv4(),
        name: input.name,
        priority: input.priority,
        complete: false,
      }),
    );
    form.resetFields();
  };
  const [form] = Form.useForm();
  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList &&
          todoList.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              name={todo.name}
              priority={todo.priority}
              completed={todo.completed}
            />
          ))}
      </Col>
      <Col span={24} style={{ marginTop: "50px" }}>
        <Form
          layout="inline"
          onFinish={handleAddButtonClick}
          initialValues={{
            inputText: "",
            priority: "Medium",
          }}
        >
          <Form.Item
            style={{ flex: 1 }}
            name="name"
            rules={[
              { required: true, message: "Todo name is required" },
              { whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="priority">
            <Select>
              <Select.Option value="High" label="High">
                <Tag color="red">High</Tag>
              </Select.Option>
              <Select.Option value="Medium" label="Medium">
                <Tag color="blue">Medium</Tag>
              </Select.Option>
              <Select.Option value="Low" label="Low">
                <Tag color="gray">Low</Tag>
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ marginRight: "0" }}>
            <Button
              type="primary"
              style={{ backgroundColor: " #1890ff" }}
              htmlType="submit"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
