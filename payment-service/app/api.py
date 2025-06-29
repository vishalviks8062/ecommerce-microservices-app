# app/api.py
from flask import Flask, request, jsonify
import pika
import json
import os

app = Flask(__name__)

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host=os.getenv("RABBITMQ_HOST", "rabbitmq"))
)
channel = connection.channel()
channel.queue_declare(queue="email_queue", durable=True)

@app.route("/pay", methods=["POST"])
def process_payment():
    data = request.json
    user_email = data.get("email")
    amount = data.get("amount")

    if not user_email or not amount:
        return jsonify({"error": "Missing email or amount"}), 400

    print(f"Processing payment of ₹{amount} for {user_email}")

    message = {
        "to": user_email,
        "subject": "Payment Confirmation",
        "content": f"Your payment of ₹{amount} was successful."
    }
    channel.basic_publish(
        exchange="",
        routing_key="email_queue",
        body=json.dumps(message),
        properties=pika.BasicProperties(delivery_mode=2) 
    )

    return jsonify({"status": "success", "message": "Payment processed and email queued"})
