# Cart Service

Handles cart operations for authenticated users.

## Endpoints

### Add to Cart
```bash
curl -X POST http://localhost:5003/cart \
     -H "Authorization: Bearer <JWT_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"id": 1, "name": "iPhone", "price": 69999, "image": "url"}'
```

### View Cart
```bash
curl -H "Authorization: Bearer <JWT_TOKEN>" \
     http://localhost:5003/api/cart
```

## Docker
Exposed on port **5003**.
