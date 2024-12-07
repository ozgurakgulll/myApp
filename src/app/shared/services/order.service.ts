import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from "../models/order.dto";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://192.168.1.115:3000/';
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createOrder(orderData: Order): Observable<Order> {
    return this.http.post<any>(this.apiUrl, orderData);
  }

  updateOrder(orderId: string, orderData: Order): Observable<Order> {
    return this.http.put<any>(`${this.apiUrl}/${orderId}`, orderData);
  }

  deleteOrder(orderId: string): Observable<Order> {
    return this.http.delete<any>(`${this.apiUrl}/${orderId}`);
  }
}
