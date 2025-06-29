from app.api import app

if __name__ == "__main__":
    print(">>> Starting checkout-service")
    app.run(host="0.0.0.0", port=5007)
