from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    address = db.Column(db.String(200))
    city = db.Column(db.String(100))
    zip = db.Column(db.String(20))
    payment_method = db.Column(db.String(50))
    product_name = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Float)
    total_price = db.Column(db.Float)
    user_id = db.Column(db.String(80))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

