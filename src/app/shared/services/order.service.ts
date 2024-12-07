import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from "../models/order.dto";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://192.168.1.115:3000/'; // API URL'niz

  constructor(private http: HttpClient) {}

  // Tüm siparişleri getir
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}orders`);
  }


  createOrder(orderData: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}orders`, orderData);
  }


  updateOrder(orderId: string, orderData: Order): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}orders/${orderId}`, orderData);
  }

  // Siparişi sil
  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}orders/${orderId}`);
  }
}
