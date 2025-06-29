from flask import Flask
from app.api import app  

if __name__ == "__main__":
    print(">>> Starting payment-service main.py")
    app.run(host="0.0.0.0", port=5006)