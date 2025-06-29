Handles all product-related operations such as listing, adding, and deleting products.

## Endpoints

### List All Products
```bash
curl http://localhost:5002/api/products
```

### Add Product (Admin Only)
```bash
curl -X POST http://localhost:5002/products \
     -H "Authorization: Bearer <JWT_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"name": "iPhone", "price": 69999, "section": "electronics"}'
```

## Docker
Exposed on port **5002**.
