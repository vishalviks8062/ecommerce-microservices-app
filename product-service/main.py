from flask import Flask
from flask_jwt_extended import JWTManager
from app.models import db
from app.routes import bp
from app.seed_products import seed_database_if_empty
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "my-dev-secret")

db.init_app(app)
jwt = JWTManager(app)
app.register_blueprint(bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
        seed_database_if_empty() 
    app.run(host='0.0.0.0', port=5002)
