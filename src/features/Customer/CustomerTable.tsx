import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Customer } from "../../models";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CustomerModal from "./CustomerModal";
import { customerActions } from "./slice/customerSlice";
import { selectCustomerLoading, selectCustomers } from "./slice/customersSlice";
import { DELETE_CUSTOMER_BY_ID, FILTER_CUSTOMER, GET_CUSTOMERS } from "./types";

const CustomerTable = () => {
  const { Search } = Input;

  const [page, setPage] = useState(1);
  //Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  //Selector
  const loading = useAppSelector(selectCustomerLoading);
  const listCustomer = useAppSelector(selectCustomers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(customerActions.setCustomerSlice({}));
    dispatch({ type: GET_CUSTOMERS });
  }, []);
  const onAdd = () => {
    dispatch(customerActions.setCustomerSlice({}));
    showModal();
  };
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: FILTER_CUSTOMER, payload: e.target.value });

  const columns: any = [
    {
      key: "id",
      title: "Id",
      render: (key: any, value: any, index: number) => (
        <>{(page - 1) * 5 + index + 1}</>
      ),
    },
    {
      key: "fullName",
      title: "Name",
      dataIndex: "name",
      sorter: (a: Customer, b: Customer) => {
        return a.name.split(" ")[a.name.split(" ").length - 1].charAt(0) >
          b.name.split(" ")[b.name.split(" ").length - 1].charAt(0)
          ? 1
          : -1;
      },
    },
    {
      key: "city",
      title: "City",
      dataIndex: "city",
      sorter: (a: Customer, b: Customer) => {
        return a.city.charAt(0) > b.city.charAt(0) ? 1 : -1;
      },
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "phone",
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "InActive",
          value: false,
        },
      ],
      onFilter: (value: boolean, record: Customer) => record.status === value,
      sortDirections: ["descend"],
      render: (status: boolean) => (
        <>
          <Tag color={status ? "blue" : "red"} key="status">
            {status ? "Active" : "InActive"}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Customer) => (
        <Space size="middle">
          <Button type="link">
            <Link to={`${record.id}`}>View Detail</Link>
          </Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch(customerActions.setCustomerSlice(record));
              showModal();
            }}
          >
            Edit
          </Button>
          <Popconfirm
            okType="danger"
            title="Are you sure？"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => {
              dispatch({ type: DELETE_CUSTOMER_BY_ID, payload: record.id });
            }}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row align="middle" style={{ marginTop: "30px" }}>
        <Col span={6}>
          <Button type="primary" size="large" onClick={onAdd}>
            Add
          </Button>
        </Col>
        <Col span={12}>
          <Input
            onChange={onSearchChange}
            placeholder="Input your search text"
            suffix={
              <Tooltip title="Search user">
                <SearchOutlined />
              </Tooltip>
            }
          />
        </Col>
      </Row>

      <Table
        loading={loading}
        columns={columns}
        dataSource={listCustomer}
        pagination={{
          position: ["bottomCenter"],
          pageSize: 5,
          onChange: (page) => {
            setPage(page);
          },
        }}
      ></Table>
      <CustomerModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default CustomerTable;