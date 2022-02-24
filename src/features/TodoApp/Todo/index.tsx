import { Row, Tag, Checkbox } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ITodo } from "../TodoList";
import todoListSlice from "../TodoList/todoListSlice";
interface IPriorityColor {
  [priority: string]: string;
}
const priorityColorMapping: IPriorityColor = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};
interface Props extends ITodo {}
export default function Todo({ id, name, priority, completed }: Props) {
  const [checked, setChecked] = useState(completed);
  const dispatch = useDispatch();
  const toggleCheckbox = () => {
    setChecked(!completed);
    dispatch(todoListSlice.actions.toggleTodoStatus(id));
  };

  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
        {priority}
      </Tag>
    </Row>
  );
}
