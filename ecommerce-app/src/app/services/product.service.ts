// // services/product.service.ts
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Product } from '../models/product.model';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private apiUrl = '/product';
  

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   // getProducts(): Observable<Product[]> {
//   //   return this.http.get<Product[]>(this.apiUrl);
//   // }

//   // getProduct(id: number): Observable<Product> {
//   //   return this.http.get<Product>(`${this.apiUrl}/${id}`);
//   // }

//   getProducts(): Observable<Product[]> {
//     return this.http.get<Product[]>(this.apiUrl);
//   }

//   addProduct(product: Partial<Product>): Observable<any> {
//     return this.http.post(this.apiUrl, product);
//   }

//   deleteProduct(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/product';  // Nginx proxy will route this to product-service

  constructor(private http: HttpClient, private authService: AuthService) {}

  // ✅ Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // ✅ Fetch a specific product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // ✅ Add a new product
  addProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // ✅ Delete a product
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}
