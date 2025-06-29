# Payment Service

Simulates payment processing. Receives events via RabbitMQ.

## Endpoint

### Trigger Payment (used by Checkout)
```bash
curl -X POST http://localhost:5005/pay \
     -H "Content-Type: application/json" \
     -d '{"orderId": "1234", "amount": 1200}'
```

## Docker
Exposed on port **5005**. Uses RabbitMQ internally.
