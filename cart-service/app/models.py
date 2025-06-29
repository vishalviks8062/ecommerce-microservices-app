from app import db
# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(120), nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    imageUrl = db.Column(db.String(255), nullable=True)
    quantity = db.Column(db.Integer, default=1)