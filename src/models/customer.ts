export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: number;
  city: string;
  status: boolean;
  createAt?: number;
  updateAt?: number;
}
