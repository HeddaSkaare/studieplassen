from flask import Flask, jsonify, request, send_from_directory
import psycopg2
from flask_cors import CORS
from config import config
from contextlib import closing
import json


app = Flask(__name__, static_url_path='',static_folder='../frontend/src/build', template_folder='?', )
CORS(app,support_credentials=True)

def get_connection():
    connection = psycopg2.connect(**config())
    connection.autocommit = True
    return connection

     
@app.route('/api/test', methods=['GET'])
def get_test():
    conn=get_connection() 
    if request.method=='GET':
        print(request.data)
        with closing(conn.cursor()) as cur:
            cur.execute(
                """SELECT *\
                  FROM "Punkter";"""
            )
            rows = cur.fetchall()
        return list(rows)

@app.route('/addplace', methods=['POST'])
def addplace():
    data = request.get_json()
    poiId = data['poiId']
    StoyNiva = data['StoyNiva']
    Vurdering = data['Vurdering']
    Korttilgang = data['Korttilgang']
    kapasitet = data['kapasitet']
    conn=get_connection()              
    with closing(conn.cursor()) as cur:
        query_sql = """
            SELECT * FROM "Vurdering" WHERE "poiId" = %s
            """
        cur.execute(query_sql, (poiId,))
        existing_record = cur.fetchone()
        if existing_record: 
            query_sql = """
                UPDATE "Vurdering"
                SET "StoyNiva" = %s, "Vurdering" = %s, "Korttilgang" = %s, "kapasitet" = %s
                WHERE "poiId" = %s
            """
            cur.execute(query_sql, (StoyNiva, Vurdering, Korttilgang, kapasitet, poiId))
        else:   
            query_sql = """
                    insert into "Vurdering"("poiId","StoyNiva","Vurdering","Korttilgang",kapasitet)
                    values (%s, %s, %s, %s, %s)
                    """  
            cur.execute(query_sql, (poiId, StoyNiva,Vurdering,Korttilgang,kapasitet))        
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run(debug=True)