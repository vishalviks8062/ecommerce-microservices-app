import os
import jwt

def decode_jwt(token):
    try:
        decoded = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
        return decoded["sub"]
    except Exception as e:
        print("JWT Decode Error:", e)
        return None
