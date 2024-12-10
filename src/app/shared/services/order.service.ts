import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl; // API URL'niz

  constructor(private http: HttpClient) {}

  // Tüm siparişleri getir
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  getAllOrdersWithFilter(filter: any): Observable<Order[]> {
    return this.http.post<Order[]>(`${this.apiUrl}/orders/list`, filter);
  }

  createOrder(orderData: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, orderData);
  }

  updateOrder(orderId: string, orderData: Partial<Order>): Observable<Order> {
    return this.http.patch<Order>(
      `${this.apiUrl}/orders/${orderId}`,
      orderData
    );
  }

  // Siparişi sil
  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/${orderId}`);
  }
}
