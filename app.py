from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import sqlite3
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)

# Load model
model = joblib.load("spam_model.pkl")

# Create app
app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "supersecretkey"

jwt = JWTManager(app)

# Home route
@app.route("/")
def home():
    return "Spam Detection API is running"

# Predict route
@app.route("/predict", methods=["POST"])
@jwt_required()
def predict():

    data = request.get_json()

    message = data["message"]

    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    # Get user
    cursor.execute(
        "SELECT free_trials FROM users WHERE username=?",
        (get_jwt_identity(),)
    )

    user = cursor.fetchone()

    free_trials = user[0]

    # Block if no trials left
    if free_trials <= 0:

        return jsonify({
            "message": "Free trial finished. Upgrade required."
        }), 403

    # Predict spam
    prediction = model.predict([message])[0]

    # Reduce trial count
    cursor.execute(
        "UPDATE users SET free_trials = free_trials - 1 WHERE username=?",
        (get_jwt_identity(),)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "result": prediction,
        "remaining_trials": free_trials - 1
    })

#Signup route
@app.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    username = data["username"]
    password = data["password"]

    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    # Check if user exists
    cursor.execute(
        "SELECT * FROM users WHERE username=?",
        (username,)
    )

    existing_user = cursor.fetchone()

    if existing_user:

        return jsonify({
            "message": "User already exists"
        }), 400

    # Create user
    cursor.execute(
        """
        INSERT INTO users (username, password, free_trials)
        VALUES (?, ?, ?)
        """,
        (username, password, 3)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "message": "Signup successful"
    })

#Login route
@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data["username"]
    password = data["password"]

    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT * FROM users
        WHERE username=? AND password=?
        """,
        (username, password)
    )

    user = cursor.fetchone()

    connection.close()

    if not user:

        return jsonify({
            "message": "Invalid credentials"
        }), 401

    access_token = create_access_token(identity=username)

    return jsonify({
        "token": access_token
    })

# Run server
if __name__ == "__main__":
    app.run(debug=True)