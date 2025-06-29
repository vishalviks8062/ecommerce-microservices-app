# app/api.py
from flask import Flask, request, jsonify
import pika
import json

app = Flask(__name__)

@app.route("/send-email", methods=["POST"])
def send_email():
    data = request.get_json()

    # Publish to RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters(host="rabbitmq"))
    channel = connection.channel()
    channel.queue_declare(queue="email_queue", durable=True)
    # channel.queue_declare(queue="email_queue", durable=False)

    channel.basic_publish(
        exchange="",
        routing_key="email_queue",
        body=json.dumps(data),
        properties=pika.BasicProperties(delivery_mode=2)
    )

    connection.close()
    return jsonify({"message": "Email sent to queue"}), 200