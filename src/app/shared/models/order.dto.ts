import { User } from './user.dto';

export class Order {
  readonly id: string = '';
  orderNo?: string;
  cakeSize?: string;
  cakeContent?: string;
  orderDate?: Date;
  createdDate?: Date;
  customerName?: string;
  customerPhone?: string;
  createdBy?: User;
  createdById?: string;
  description?: string;
  balance?: number;
  deposit?: number;
  image?: string;
  status?: 'pending' | 'completed' | 'todo' | 'canceled' = 'todo';

  constructor() {
    this.orderNo = '';
    this.orderDate = new Date();
    this.createdDate = new Date();
    this.customerName = '';
    this.customerPhone = '';
    this.createdById = '';
    this.createdBy = new User();
  }
}
