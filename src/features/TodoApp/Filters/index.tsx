import {
  Col,
  Row,
  Input,
  Typography,
  Radio,
  Select,
  Tag,
  RadioChangeEvent,
} from "antd";
import { ChangeEvent } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import filtersSlice from "./FiltersSlice";

const { Search } = Input;

export default function Filters() {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("All");
  const [prioriry, setPriority] = useState<string[]>([]);

  const dispatch = useDispatch();

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    dispatch(filtersSlice.actions.searchFilterChange(e.target.value));
  };
  const handleStatusChange = (e: RadioChangeEvent) => {
    setStatus(e.target.value);
    dispatch(filtersSlice.actions.statusFilterChange(e.target.value));
  };
  const handlePriorityChange = (value: string[]) => {
    setPriority(value);
    dispatch(filtersSlice.actions.priorityFilterChange(value));
  };
  return (
    <Row justify="center">
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search
          placeholder="input search text"
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={status} onChange={handleStatusChange}>
          <Radio value="All">All</Radio>
          <Radio value="Completed">Completed</Radio>
          <Radio value="Todo">To do</Radio>
        </Radio.Group>
      </Col>
      <Col xs={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
          style={{ width: "100%" }}
          value={prioriry}
          onChange={handlePriorityChange}
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
      </Col>
    </Row>
  );
}
