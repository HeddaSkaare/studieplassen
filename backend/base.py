from flask import Flask, jsonify, request, send_from_directory
import psycopg2
from flask_cors import CORS
from config import config
from contextlib import closing

app = Flask(__name__, static_url_path='',static_folder='../src/build', template_folder='?', )
CORS(app,support_credentials=True)

def get_connection():
    connection = psycopg2.connect(**config())
    connection.autocommit = True
    return connection


@app.route('/api/test/', methods=['GET'])
def get_test():
    conn=get_connection() 
    if request.method=='GET':
        with closing(conn.cursor()) as cur:
            cur.execute(
                f"SELECT *\
                  FROM test;"
            )
            rows = cur.fetchall()
        print(rows)
        return list(rows)
            
# json_agg (st_asgeojson (points.*)::json)

if __name__ == '__main__':
    app.run(debug=True)
