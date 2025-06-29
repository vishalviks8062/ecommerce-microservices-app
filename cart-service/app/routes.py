from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, CartItem

cart_bp = Blueprint("cart", __name__)

@cart_bp.route("", methods=["POST"])
@jwt_required()
def add_to_cart():
    data = request.get_json()
    user_id = get_jwt_identity()
    print(f"Adding to cart for user: {user_id}")

    try:
        product_id = int(data["product_id"])
        name = data["name"]
        price = float(data["price"])
        imageUrl = data.get("imageUrl", "")
        quantity = int(data.get("quantity", 1))
    except (KeyError, ValueError, TypeError):
        return jsonify({"error": "Invalid or missing fields"}), 400

    existing_item = CartItem.query.filter_by(user_id=user_id, product_id=product_id).first()

    if existing_item:
        existing_item.quantity += quantity
    else:
        new_item = CartItem(
            user_id=user_id,
            product_id=product_id,
            name=name,
            price=price,
            imageUrl=imageUrl,
            quantity=quantity
        )
        db.session.add(new_item)

    db.session.commit()
    return jsonify({"message": "Item added to cart"}), 201


@cart_bp.route("", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    items = CartItem.query.filter_by(user_id=user_id).all()

    result = [
        {
            "product": {
                "id": item.product_id,
                "name": item.name,
                "price": item.price,
                "imageUrl": item.imageUrl
            },
            "quantity": item.quantity
        }
        for item in items
    ]
    return jsonify(result), 200



@cart_bp.route("/<int:item_id>", methods=["PUT"])
@jwt_required()
def update_quantity(item_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    quantity = data.get("quantity", 1)

    item = CartItem.query.filter_by(id=item_id, user_id=user_id).first()
    if not item:
        return jsonify({"error": "Item not found"}), 404

    item.quantity = quantity
    db.session.commit()
    return jsonify({"message": "Quantity updated"}), 200

@cart_bp.route("/<int:item_id>", methods=["DELETE"])
@jwt_required()
def remove_item(item_id):
    user_id = get_jwt_identity()
    item = CartItem.query.filter_by(id=item_id, user_id=user_id).first()
    if not item:
        return jsonify({"error": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item removed"}), 200

@cart_bp.route("", methods=["DELETE"])
@jwt_required()
def clear_cart():
    user_id = get_jwt_identity()
    items = CartItem.query.filter_by(user_id=user_id).all()
    for item in items:
        db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Cart cleared"}), 200
