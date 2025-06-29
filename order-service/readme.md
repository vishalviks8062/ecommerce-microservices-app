# Order Service

Manages user order placement and order history.

## Endpoints

### Place Order
```bash
curl -X POST http://localhost:5004/order \
     -H "Authorization: Bearer <JWT_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"cart": [...]}'  # Your cart items
```

### View Order History
```bash
curl -H "Authorization: Bearer <JWT_TOKEN>" \
     http://localhost:5004/api/order/history
```

## Docker
Exposed on port **5004**.
