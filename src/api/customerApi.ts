import { Customer, ListResponse, ListParams } from "../models";
import axiosClient from "./axiosClient";
const url = "/users";

const customerApi = {
  async getAll(params?: ListParams): Promise<Customer[]> {
    return axiosClient.get(url, { params });
  },
  async getById(id: string): Promise<Customer> {
    return axiosClient.get(url + `/${id}`);
  },
  async add(data: Customer): Promise<Customer> {
    return axiosClient.post(url, data);
  },
  async update(data: Customer): Promise<Customer> {
    return axiosClient.patch(url + `/${data.id}`, data);
  },
  async remove(id: string): Promise<any> {
    return axiosClient.delete(url + `/${id}`);
  },
};
export default customerApi;
