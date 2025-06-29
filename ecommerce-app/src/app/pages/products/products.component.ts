// import { Component, OnInit } from '@angular/core';
// import { Product } from '../../models/product.model';
// import { ProductService } from '../../services/product.service';
// import { AuthService } from '../../services/auth.service';
// import { CartService } from '../../services/cart.service';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   products: Product[] = [];
//   isAdmin = false;
//   showAddForm = false;
//   newProduct: Partial<Product> = {
//     name: '',
//     price: 0,
//     category: '',
//     imageUrl: '',
//     description: ''
//   };

//   constructor(
//     private productService: ProductService,
//     private authService: AuthService,
//     private cartService: CartService
//   ) {}

//   ngOnInit(): void {
//     this.loadProducts();
//     this.isAdmin = this.authService.getLoggedInUsername() === 'admin';
//   }

//   loadProducts(): void {
//     this.productService.getProducts().subscribe({
//       next: (data) => this.products = data,
//       error: (err) => console.error('Failed to load products', err)
//     });
//   }

//   openAddForm(): void {
//     this.showAddForm = true;
//   }

//   closeAddForm(): void {
//     this.showAddForm = false;
//     this.newProduct = {
//       name: '',
//       price: 0,
//       category: '',
//       imageUrl: '',
//       description: ''
//     };
//   }

//   addProduct(): void {
//     if (this.newProduct.name && this.newProduct.price && this.newProduct.category) {
//       this.productService.addProduct(this.newProduct).subscribe({
//         next: () => {
//           this.loadProducts();
//           this.closeAddForm();
//           alert('Product added successfully!');
//         },
//         error: (err) => {
//           console.error('Failed to add product', err);
//           alert('Failed to add product.');
//         }
//       });
//     }
//   }

//   deleteProduct(productId: number): void {
//     if (confirm('Are you sure to delete this product?')) {
//       this.productService.deleteProduct(productId).subscribe({
//         next: () => {
//           this.products = this.products.filter(p => p.id !== productId);
//           alert('Product deleted successfully!');
//         },
//         error: (err) => {
//           console.error('Failed to delete product', err);
//           alert('Failed to delete product.');
//         }
//       });
//     }
//   }

//   addToCart(product: Product): void {
//     this.cartService.addToCart(product.id, 1).subscribe({
//       next: () => alert(`${product.name} added to cart!`),
//       error: (err) => {
//         console.error('Failed to add to cart:', err);
//         alert('Add to cart failed.');
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
// import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isAdmin = false;
  showAddForm = false;

  newProduct: Partial<Product> = {
    name: '',
    price: 0,
    category: '',
    imageUrl: '',
    description: ''
  };

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.isAdmin = this.authService.getLoggedInUsername() === 'admin';
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }

  openAddForm(): void {
    this.showAddForm = true;
  }

  closeAddForm(): void {
    this.showAddForm = false;
    this.newProduct = {
      name: '',
      price: 0,
      category: '',
      imageUrl: '',
      description: ''
    };
  }

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.category) {
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeAddForm();
          alert('Product added successfully!');
        },
        error: (err) => {
          console.error('Failed to add product', err);
          alert('Failed to add product.');
        }
      });
    }
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== productId);
          alert('Product deleted successfully!');
        },
        error: (err) => {
          console.error('Failed to delete product', err);
          alert('Failed to delete product.');
        }
      });
    }
  }

  // addToCart(product: Product): void {
  //   this.cartService.addToCart(product.id, 1).subscribe({
  //     next: () => alert(`${product.name} added to cart!`),
  //     error: (err) => {
  //       console.error('Failed to add to cart:', err);
  //       alert('Add to cart failed.');
  //     }
  //   });
  // }

  addToCart(product: Product): void {
    const cartItem = {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl
      },
      quantity: 1
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: () => alert(`${product.name} added to cart!`),
      error: (err) => {
        console.error('Failed to add to cart:', err);
        alert('Add to cart failed.');
      }
    });
  }
}
