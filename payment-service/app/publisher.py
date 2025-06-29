import pika
import json

def publish_email_notification(to, subject, content):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
    channel = connection.channel()
    channel.queue_declare(queue="email_queue", durable=False)

    message = {
        "to": to,
        "subject": subject,
        "content": content
    }

    channel.basic_publish(
        exchange='',
        routing_key='email_queue',
        body=json.dumps(message)
    )
    print(f"[x] Sent email notification to queue for: {to}")
    connection.close()