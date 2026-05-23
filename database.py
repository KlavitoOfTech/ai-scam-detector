import sqlite3

connection = sqlite3.connect("users.db")

cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    free_trials INTEGER
)
""")

connection.commit()

connection.close()

print("Database created")

cursor.execute("""
INSERT INTO users (username, free_trials)
VALUES (?, ?)
""", ("claver", 3))