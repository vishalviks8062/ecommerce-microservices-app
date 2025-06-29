# E-commerce Microservices Application

This repository hosts a complete **E-commerce Application** built using a **microservices architecture**. It includes a full-featured **Angular frontend** and multiple **Flask-based backend services**, all integrated using **Docker Compose** and served via **NGINX API Gateway**.

---

## 🧱 Architecture Overview

```
              ┌──────────────────────────────────────────┐
              │              Angular UI (ecommerce-app) │
              └──────────────────────────────────────────┘
                                 │
                                 ▼
                        ┌──────────────┐
                        │    NGINX     │  ← API Gateway (Reverse Proxy)
                        └──────────────┘
        ┌────────────────┼────────────┬─────────────┬────────────┐
        ▼                ▼            ▼             ▼            ▼
┌────────────┐ ┌────────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────┐
│ user-auth  │ │ product-service│ │ cart       │ │ order      │ │ payment      │
│  service   │ │                │ │  service   │ │  service   │ │  service     │
└────────────┘ └────────────────┘ └────────────┘ └────────────┘ └──────────────┘
                                                    │
                                                    ▼
                                              ┌────────────┐
                                              │ email      │
                                              │ service    │
                                              └────────────┘
```

All services are containerized and run via Docker. Communication is primarily HTTP-based, routed through NGINX.

---

## 🚀 UI Walkthrough (Angular Frontend)

The Angular frontend (`ecommerce-app/`) provides the user interface for customers and the admin. It is built using:

* **TypeScript + [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.
* **Routing and Services for API integration**
* **Bootstrap / CSS styling**

### 🧑‍💼 Roles

* **Guest**: Can view products
* **Authenticated User**: Can add to cart, checkout, and view order history
* **Admin**: Can **add/remove products** from the product list

### 🧩 Main UI Components

| Component               | Route Path  | Description                                |
| ----------------------- | ----------- | ------------------------------------------ |
| `NavbarComponent`       | `*`         | Navigation bar (home, login, cart)         |
| `HomeComponent`         | `/`         | Landing page with product listings         |
| `ProductComponent`      | `/products` | Shows all available products               |
| `LoginComponent`        | `/login`    | Login form with JWT auth                   |
| `RegisterComponent`     | `/register` | Registration form                          |
| `CartComponent`         | `/cart`     | Lists items added to the cart              |
| `CheckoutComponent`     | `/checkout` | Confirms address, payment and places order |
| `OrderHistoryComponent` | `/orders`   | Displays past orders                       |
| `AdminComponent`        | `/admin`    | Visible only to admin: add/remove products |

---

## 🔐 Admin Flow

1. Admin logs in with:

   * **username**: `admin`
   * **email**: `admin@ecomm.com`
   * **password**: `adminpwd`

2. After login:

   * The JWT token authenticates the user
   * Role is checked on the frontend
   * Admin-only UI buttons become visible ("Add Product", "Remove")

3. Admin can:

   * Click "Add Product" → popup or new form
   * Click "Delete" icon on a product to remove it

---

## ⚙️ Backend Microservices (Flask)

| Service             | Port | Description                                    |
| ------------------- | ---- | ---------------------------------------------- |
| `user-auth-service` | 5001 | Handles registration, login, JWT tokens        |
| `product-service`   | 5002 | Returns product list, handles admin add/remove |
| `cart-service`      | 5003 | Manages cart contents per user                 |
| `order-service`     | 5004 | Places orders and fetches order history        |
| `payment-service`   | 5005 | Simulates payment and notifies order-service   |
| `email-service`     | 5006 | Sends email confirmation post-purchase         |
| `checkout-service`  | 5007 | Orchestrates final checkout call               |

All services are **stateless** and use **SQLite** for local persistence.

---

## 🔄 Request Flow Example

### User Flow:

1. Visit `/products` → Product list fetched from `product-service`
2. Add item to cart → Sends POST to `cart-service`
3. Checkout → Calls `checkout-service`
4. Internally:

   * `checkout` → `order` + `payment`
   * `payment` success → `email-service` triggers

### Admin Flow:

1. Login → `user-auth-service`
2. View product list → Same as user
3. Add product → POST to `product-service`
4. Delete product → DELETE to `product-service`

---

## 🛠️ Tech Stack

### Frontend:

* Angular 17
* HTML, CSS, TypeScript
* JWT Authentication

### Backend:

* Python Flask
* SQLite (for demo storage)
* JWT

### DevOps:

* Docker
* Docker Compose
* NGINX Reverse Proxy
* GitHub

---

## 📁 Folder Structure

```
.
├── cart-service/
├── checkout-service/
├── email-service/
├── nginx/                  # Contains nginx.conf
├── order-service/
├── payment-service/
├── product-service/
├── user-auth-service/
├── ecommerce-app/          # Angular frontend
├── docker-compose.yaml
└── README.md
```

Each microservice can have its own `README.md` to describe internal routes, DB schema, and behavior. I can help auto-generate these.

---

## ✅ Next Steps

* [ ] Add README to each service folder (on request)
* [ ] Add diagrams and architecture PNG/SVGs
* [ ] Deploy to cloud (EC2 or Render)

Let me know what you'd like to do next.

