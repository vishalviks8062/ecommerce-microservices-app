import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data;
      },
      error: (err: any) => {
        console.error('Failed to load order history:', err);
      }
    });
  }
}
