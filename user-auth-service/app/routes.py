from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.models import db, User  

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [{"id": user.id, "username": user.username} for user in users]
    return jsonify(user_list)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    data = request.get_json()
    usr = data.get('username')
    em = data.get('email') 
    pwd = data.get('password')

    print(request.json)

    if not usr or not em or not pwd:
        return jsonify({'error': 'Missing fields'}), 400
    if User.query.filter_by(username=usr).first():
        return jsonify({"msg": "Username already exists"}), 409

    hashed_pw = generate_password_hash(pwd)
    user = User(username=usr, email = em, password_hash=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201



@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(username=data["username"]).first()

    if not user or not check_password_hash(user.password_hash, data["password"]):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.username)
    return jsonify({"access_token": access_token}), 200


