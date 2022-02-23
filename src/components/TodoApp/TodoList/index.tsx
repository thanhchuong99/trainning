import { Col, Row, Input, Button, Select, Tag } from "antd";
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
export default function TodoList() {
  const [inputText, setInputText] = useState("");
  const [priority, setPriority] = useState("Medium");

  const todoList = useSelector(todoRemainingSelector);
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleStatusChange = (value: string) => {
    setPriority(value);
  };
  const handleAddButtonClick = () => {
    if (inputText.trim()) {
      dispatch(
        todoListSlice.actions.addTodo({
          id: uuidv4(),
          name: inputText,
          priority: priority,
          complete: false,
        }),
      );
    }
    setInputText("");
    setPriority("Medium");
  };

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
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={inputText} onChange={handleInputChange} />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handleStatusChange}
          >
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
          <Button type="primary" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
