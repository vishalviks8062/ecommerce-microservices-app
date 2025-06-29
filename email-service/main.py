# main.py
from threading import Thread
from app.consumer import start_consumer
from app.api import app  

if __name__ == "__main__":
    print(">>> Starting email-service main.py")
    
    # Start consumer thread
    Thread(target=start_consumer, daemon=True).start()
    print(">>> Consumer thread started")

    # Run Flask server
    app.run(host="0.0.0.0", port=5004)
