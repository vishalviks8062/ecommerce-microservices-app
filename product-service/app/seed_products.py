import json
import os
from .models import db, Product

def seed_database_if_empty():
    if Product.query.first():
        print("Products already exist. Skipping seeding.")
        return

    json_path = os.path.join(os.path.dirname(__file__), 'static', 'assets', 'products.json')
    print(f"Seeding products from: {json_path}")

    with open(json_path) as f:
        products = json.load(f)
        for prod in products:
            p = Product(
                name=prod['name'],
                price=prod['price'],
                category=prod['category'],
                description=prod['description'],
                image_url=prod['image_url']
            )
            db.session.add(p)
        db.session.commit()
        print(f"Seeded {len(products)} products successfully.")
