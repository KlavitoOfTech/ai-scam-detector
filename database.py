import sqlite3

# Connect to database
connection = sqlite3.connect("users.db")

# Create cursor
cursor = connection.cursor()

# Delete old table if it already exists
cursor.execute("DROP TABLE IF EXISTS users")

# Create new users table
cursor.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    free_trials INTEGER DEFAULT 3
)
""")

# Insert sample user
cursor.execute("""
INSERT INTO users (username, password, free_trials)
VALUES (?, ?, ?)
""", ("claver", "password123", 3))

# Save changes
connection.commit()

# Close connection
connection.close()

print("Database updated successfully")