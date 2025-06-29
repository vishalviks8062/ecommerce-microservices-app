
from flask import Blueprint, jsonify, request
from .models import db, Product
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('routes', __name__)

@bp.route('/product', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'price': p.price,
        'category': p.category,
        'description': p.description,
        'image_url': p.image_url
    } for p in products])

@bp.route('/product', methods=['POST'])
@jwt_required()
def add_product():
    identity = get_jwt_identity()
    print(identity)
    if identity != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    product = Product(
        name=data['name'],
        price=data['price'],
        category=data['category'],
        description=data['description'],
        image_url=data['image_url']
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Product added'}), 201

@bp.route('/product/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    identity = get_jwt_identity()
    if identity != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Not found'}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'}), 200
