from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, Order
from datetime import datetime

order_bp = Blueprint("orders", __name__)



@order_bp.route("", methods=["POST"])
@jwt_required()
def place_order():
    data = request.get_json()
    user_id = get_jwt_identity()

    items = data.get("items", [])
    if not items:
        return jsonify({"error": "No items provided"}), 400

    for item in items:
        order = Order(
            full_name=data.get("fullName"),
            address=data.get("address"),
            city=data.get("city"),
            zip=data.get("zip"),
            payment_method=data.get("paymentMethod"),
            product_name=item["name"],
            price=item["price"],
            quantity=item["quantity"],
            total_price=item["price"] * item["quantity"],
            user_id=user_id
        )
        db.session.add(order)

    db.session.commit()

    return jsonify({"message": "Order(s) placed successfully"}), 201


@order_bp.route("", methods=["GET"])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.timestamp.desc()).all()

    grouped = {}
    for order in orders:
        key = order.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        if key not in grouped:
            grouped[key] = {
                "date": key,
                "totalAmount": 0,
                "shippingInfo": {
                    "fullName": order.full_name,
                    "address": order.address,
                    "city": order.city,
                    "zip": order.zip,
                    "paymentMethod": order.payment_method
                },
                "items": []
            }
        grouped[key]["items"].append({
            "name": order.product_name,
            "price": order.price,
            "quantity": order.quantity
        })
        grouped[key]["totalAmount"] += order.price * order.quantity

    return jsonify(list(grouped.values())), 200
