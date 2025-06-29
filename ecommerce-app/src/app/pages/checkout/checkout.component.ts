// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CartService } from '../../services/cart.service';
// import { OrderService } from '../../services/order.service';
// import { Router } from '@angular/router';
// import { Product } from '../../models/product.model';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent implements OnInit {
//   checkoutForm: FormGroup;
//   totalAmount: number = 0;
//   cartItems: Product[] = [];

//   constructor(
//     private fb: FormBuilder,
//     private cartService: CartService,
//     private orderService: OrderService,
//     private router: Router
//   ) {
//     this.checkoutForm = this.fb.group({
//       fullName: ['', Validators.required],
//       address: ['', Validators.required],
//       city: ['', Validators.required],
//       zip: ['', Validators.required],
//       paymentMethod: ['cod', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     // Fetch cart items from the backend
//     this.cartService.getItems().subscribe({
//       next: (items) => {
//         this.cartItems = items;
//         this.totalAmount = items.reduce((sum, item) => sum + item.price, 0);
//       },
//       error: (err) => {
//         console.error('Failed to load cart items:', err);
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.checkoutForm.valid && this.cartItems.length > 0) {
//       const formData = this.checkoutForm.value;
  
//       const orderPayload = {
//         ...formData, // fullName, address, city, zip, paymentMethod
//         totalAmount: this.totalAmount,
//         items: this.cartItems.map(item => ({
//           name: item.name,
//           quantity: 1,
//           price: item.price
//         }))
//       };
  
//       this.orderService.placeOrder(orderPayload).subscribe({
//         next: () => {
//           this.cartService.clearCart().subscribe({
//             next: () => {
//               alert('Order placed successfully!');
//               this.router.navigate(['/orders']);
//             },
//             error: (err) => {
//               console.error('Error clearing cart:', err);
//               alert('Order placed, but failed to clear cart.');
//               this.router.navigate(['/orders']);
//             }
//           });
//         },
//         error: (err) => {
//           console.error('Failed to place order:', err);
//           alert('Failed to place order. Try again.');
//         }
//       });
//     } else {
//       alert('Form is invalid or cart is empty.');
//     }
//   }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  totalAmount: number = 0;
  cartItems: CartItem[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      paymentMethod: ['cod', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartService.getItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },
      error: (err) => {
        console.error('Failed to load cart items:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid && this.cartItems.length > 0) {
      const formData = this.checkoutForm.value;

      const orderPayload = {
        ...formData,
        totalAmount: this.totalAmount,
        items: this.cartItems.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        }))
      };

      this.orderService.placeOrder(orderPayload).subscribe({
        next: () => {
          this.cartService.clearCart().subscribe({
            next: () => {
              alert('Order placed successfully!');
              this.router.navigate(['/orders']);
            },
            error: (err) => {
              console.error('Error clearing cart:', err);
              alert('Order placed, but failed to clear cart.');
              this.router.navigate(['/orders']);
            }
          });
        },
        error: (err) => {
          console.error('Failed to place order:', err);
          alert('Failed to place order. Try again.');
        }
      });
    } else {
      alert('Form is invalid or cart is empty.');
    }
  }
}
