from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import sqlite3

# Load model
model = joblib.load("spam_model.pkl")

# Create app
app = Flask(__name__)
CORS(app)

# Home route
@app.route("/")
def home():
    return "Spam Detection API is running"

# Predict route
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    message = data["message"]

    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    # Get user
    cursor.execute(
        "SELECT free_trials FROM users WHERE username=?",
        ("claver",)
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
        ("claver",)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "result": prediction,
        "remaining_trials": free_trials - 1
    })

# Run server
if __name__ == "__main__":
    app.run(debug=True)