import { Student, ListResponse, ListParams } from "../models";
import axiosClient from "./axiosClient";
const url = "/student";
const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Student> {
    return axiosClient.get(url + `/${id}`);
  },
  add(data: Student): Promise<Student> {
    return axiosClient.post(url, data);
  },
  update(data: Student): Promise<Student> {
    return axiosClient.patch(url, data);
  },
  remove(id: string): Promise<any> {
    return axiosClient.delete(url + `/${id}`);
  },
};
export default studentApi;
