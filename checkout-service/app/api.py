from flask import Flask, request, jsonify
from app.utils import decode_jwt
from app.publisher import publish_email

app = Flask(__name__)

@app.route("/checkout", methods=["POST"])
def checkout():
    data = request.json
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Missing or invalid token"}), 401

    token = auth_header.split(" ")[1]
    user = decode_jwt(token)
    if not user:
        return jsonify({"error": "Invalid token"}), 401

    email = data.get("email")
    cart = data.get("cart")
    amount = data.get("amount")

    print("data : "+ data)

    if not email or not cart or not amount:
        return jsonify({"error": "Missing checkout data"}), 400

    subject = "Order Confirmation"
    body = f"Your order has been placed successfully! Amount: ₹{amount}"
    print("body : "+ body)
    publish_email(email, subject, body)

    return jsonify({"message": "Checkout successful and email queued!"}), 200
