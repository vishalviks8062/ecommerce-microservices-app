import pika
import json
import time
import smtplib
import os
from email.message import EmailMessage


def callback(ch, method, properties, body):
    message = json.loads(body)
    print(f"[x] Received message for email service: {message}")

    recipient = message.get("to")
    subject = message.get("subject")
    content = message.get("body")

    print(f"Sending email to {recipient}")
    print(f"Subject: {subject}")
    print(f"Content: {content}")

    smtp = smtplib.SMTP("smtp.gmail.com", 587)
    smtp.starttls()
    smtp.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))

    email_msg = EmailMessage()
    email_msg["From"] = os.getenv("EMAIL_USER")
    email_msg["To"] = recipient
    email_msg["Subject"] = subject
    email_msg.set_content(content)

    smtp.send_message(email_msg)
    smtp.quit()

def start_consumer():
    print(">>> Consumer connecting to RabbitMQ...")

    connection = None
    for attempt in range(10):  
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(host='rabbitmq')
            )
            break
        except pika.exceptions.AMQPConnectionError:
            print(f"RabbitMQ not ready, retrying... ({attempt + 1}/10)")
            time.sleep(3)

    if not connection:
        print("Failed to connect to RabbitMQ after retries.")
        return

    channel = connection.channel()
    channel.queue_declare(queue='email_queue', durable=True)
    print("[*] Waiting for messages in email_queue. To exit press CTRL+C")

    channel.basic_consume(
        queue='email_queue',
        on_message_callback=callback,
        auto_ack=True
    )
    channel.start_consuming()
