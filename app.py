# app.py
from flask import Flask, g
import sqlite3
import os

app = Flask(__name__)
DATABASE = os.path.join(os.getcwd(), 'data', 'bakery_management_system.db')

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/')
def hello_world():
    # Query the database to confirm connection
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT name FROM Users LIMIT 1")
        test_data = cursor.fetchone()
        
        if test_data:
            return f'Hello, Baker! BMS is running. DB is connected.'
        else:
            return 'Hello, Baker! BMS is running, but DB is empty.'
    except sqlite3.OperationalError as e:
        return f"Error: Database connection failed. Details: {e}", 500

if __name__ == '__main__':
    # When running locally (outside Docker), use the default port 5000
    app.run(host='0.0.0.0', port=5000)