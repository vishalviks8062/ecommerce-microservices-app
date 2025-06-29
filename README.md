# E-Commerce Microservices Application

An end-to-end **e-commerce application** built using a **microservices architecture**, this project demonstrates how different services interact with one another to deliver modular, scalable, and maintainable software. The system includes user authentication, product listing, cart handling, order placement, payment processing, email notifications, and admin management features.

---

## ✨ Features

* User registration and login (JWT-based authentication)
* Admin-only access for adding/removing products
* Add to cart & view cart
* Place orders
* Cash-on-Delivery (COD) payment method
* Confirmation emails post-purchase
* Angular frontend UI
* Dockerized deployment of all services

---

## 🌐 System Architecture

```plaintext
+----------------+       +-------------------+
|   Angular UI   | <---> |     NGINX (API     |
|  (ecommerce-   |       |     Gateway)       |
|     app)       |       +----------+---------+
+----------------+                  |
                                     | (REST API Calls)
      ----------------------------------------------------------------------
     |            |             |           |             |              |
     V            V             V           V             V              V
+----------+  +-----------+ +--------+  +--------+   +-----------+   +-------------+
| user-auth|  | product-  | | cart   |  | order  |   | payment   |   | email-      |
| -service |  | service   | | service|  | service|   | service   |   | service     |
+----------+  +-----------+ +--------+  +--------+   +-----------+   +-------------+
                                                   
                           +----------------------------------+
                           |       RabbitMQ (Message Queue)   |
                           +----------------------------------+
```

---

## 📄 Use Case Summary

### 🔑 **Authentication (user-auth-service)**

* Handles registration and login
* JWT token generation and validation
* Admin user: `admin@ecomm.com` / `adminpwd`

### 📅 **Product Management (product-service)**

* Stores product listings
* Admins can `POST` (add) or `DELETE` (remove) products
* Users can fetch product list

### 🚚 **Cart (cart-service)**

* In-memory cart (user-specific)
* Add, remove, and list items in cart

### 💼 **Order Placement (order-service)**

* Stores order data (products, user info, total)
* Handles order submission
* Fetch previous orders for a user

### 💳 **Payment (payment-service)**

* Simulates payment (currently only COD)
* Sends confirmation to RabbitMQ

### 📧 **Email (email-service)**

* Listens on RabbitMQ queue
* Sends confirmation email to user

### 🔧 **Checkout (checkout-service)**

* Coordinates cart + user info + order placement + payment

### 🎨 **Frontend (Angular App)**

* Products page
* Cart view & update
* Order history
* Checkout flow
* Admin-only features: Add/Remove products

---

## 💪 Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Frontend   | Angular                       |
| Backend    | Flask (Python)                |
| Messaging  | RabbitMQ                      |
| Auth       | Flask-JWT-Extended            |
| DB         | SQLite (can be swapped later) |
| Deployment | Docker, Docker Compose        |
| Gateway    | NGINX                         |

---

## 👥 Admin Privileges

Only the user with credentials:

```
email: admin@ecomm.com
password: adminpwd
```

is allowed to:

* Add products via a popup form
* Remove any existing product
* These buttons are hidden from regular users

---

## 🔄 Flow Summary

### Placing an Order:

1. User logs in and browses products
2. Adds items to cart
3. Goes to checkout
4. Fills in address and payment option (only COD for now)
5. `checkout-service` compiles everything and:

   * Places order via `order-service`
   * Triggers payment via `payment-service`
   * Sends email via RabbitMQ and `email-service`
6. Order visible in user dashboard

---

## 📅 Directory Structure

```
- ecommerce-app/              <-- Angular frontend
- cart-service/
- checkout-service/
- email-service/
- nginx/                      <-- API Gateway config
- order-service/
- payment-service/
- product-service/
- user-auth-service/
- docker-compose.yaml
- README.md
```

---

## 📚 READMEs for Each Service

Each microservice can have its own `README.md` describing:

* Purpose of the service
* Endpoints exposed (with sample payloads)
* How it interacts with other services
* How to run/debug locally

For example, in `product-service/README.md`:

```md
# Product Service

## Endpoints
- `GET /products`: List all products
- `POST /products` (admin only): Add product
- `DELETE /products/<id>` (admin only): Remove product

## Sample Product JSON
```

{
"name": "Laptop",
"price": 1299.99,
"imageUrl": "https\://..."
}

```
```

---

## 🌐 Deployment Instructions

```bash
# From root directory
$ docker-compose up --build
```

Access the frontend at: [http://localhost](http://localhost)

Admin login to access product controls.

---


