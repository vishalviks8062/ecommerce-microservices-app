import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id?: number;  // Optional for new orders
  date?: string; // Optional for new orders
  totalAmount: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  fullName: string;
  address: string;
  city: string;
  zip: string;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = '/orders';  // Proxied via Nginx to order-service

  constructor(private http: HttpClient) {}

  // ✅ Get order history
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // ✅ Place new order
  placeOrder(orderData: Omit<Order, 'id' | 'date'>): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }
}
