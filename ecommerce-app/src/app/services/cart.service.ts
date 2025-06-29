import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = '/cart';

  constructor(private http: HttpClient) {}

  addToCart(item: CartItem): Observable<any> {
    const payload = {
      product_id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      imageUrl: item.product.imageUrl,
      quantity: item.quantity || 1
    };
    return this.http.post(this.apiUrl, payload);
  }

  getItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  updateQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, { quantity });
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}
