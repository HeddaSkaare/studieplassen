from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# Database configuration
db_config = {
    'host': 'geomatikk.ibm.ntnu.no',
    'port': '5433',
    'dbname': 'Study_place',
    'user': 'postgres',
    'password': 'postgres'
}

# Connect to the database
conn = psycopg2.connect(**db_config)

# Create a cursor object
cur = conn.cursor()

# Create a table to store JSON data
cur.execute("""
    CREATE TABLE IF NOT EXISTS json_data (
        id SERIAL PRIMARY KEY,
        data JSONB
    )
""")
conn.commit()

# Define a route to handle incoming JSON data
@app.route('/json-data', methods=['POST'])
def store_json_data():
    data = request.json
    
    # Insert the JSON data into the database
    cur.execute("""
        INSERT INTO json_data (data) VALUES (%s)
    """, (json.dumps(data),))
    conn.commit()
    
    return jsonify({'message': 'Data stored successfully'})

if __name__ == '__main__':
    app.run(debug=True)