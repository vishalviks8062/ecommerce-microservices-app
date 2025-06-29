// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../../services/cart.service';
// import { CartItem } from '../../models/cart-item.model';
// import { ProductService } from '../../services/product.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   items: CartItem[] = [];
//   total = 0;

//   constructor(private cartService: CartService, private productService: ProductService) {}

//   ngOnInit(): void {
//     this.loadCart();
//   }

//   loadCart(): void {
//     this.cartService.getItems().subscribe({
//       next: (cartItems) => {
//         this.items = cartItems;
//         this.total = this.calculateTotal(cartItems);
//       },
//       error: (err) => console.error('Error loading cart:', err)
//     });
//   }

//   calculateTotal(items: CartItem[]): number {
//     return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
//   }

//   increment(item: CartItem): void {
//     this.cartService.updateQuantity(item.id, item.quantity + 1).subscribe(() => this.loadCart());
//   }

//   decrement(item: CartItem): void {
//     if (item.quantity > 1) {
//       this.cartService.updateQuantity(item.id, item.quantity - 1).subscribe(() => this.loadCart());
//     }
//   }

//   removeItem(cartItemId: number): void {
//     this.cartService.removeFromCart(cartItemId).subscribe(() => this.loadCart());
//   }

//   clearCart(): void {
//     this.cartService.clearCart().subscribe(() => {
//       this.items = [];
//       this.total = 0;
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getItems().subscribe({
      next: (cartItems) => {
        this.items = cartItems;
        this.total = this.calculateTotal(cartItems);
      },
      error: (err) => console.error('Error loading cart:', err)
    });
  }

  calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  increment(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1).subscribe(() => this.loadCart());
  }

  decrement(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product.id, item.quantity - 1).subscribe(() => this.loadCart());
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(() => this.loadCart());
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.items = [];
      this.total = 0;
    });
  }
}
