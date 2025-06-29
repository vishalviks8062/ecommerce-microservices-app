# Checkout Service

Coordinates cart, order, and payment services to complete the purchase.

## Endpoint

### Checkout
```bash
curl -X POST http://localhost:5007/checkout \
     -H "Authorization: Bearer <JWT_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"user_id": 1, "cart": [...]}'
```

## Docker
Exposed on port **5007**.
