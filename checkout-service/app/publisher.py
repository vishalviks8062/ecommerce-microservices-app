import pika
import json
import os

def publish_email(to, subject, body):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host="rabbitmq")
    )
    channel = connection.channel()
    channel.queue_declare(queue="email_queue", durable=True)

    message = {
        "to": to,
        "subject": subject,
        "body": body
    }

    channel.basic_publish(
        exchange="",
        routing_key="email_queue",
        body=json.dumps(message),
        properties=pika.BasicProperties(delivery_mode=2)
    )

    connection.close()
