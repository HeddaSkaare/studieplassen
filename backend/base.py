from flask import Flask, jsonify, request, send_from_directory
import psycopg2
from flask_cors import CORS
from config import config
from contextlib import closing
import json

# dict = []
# with open('infos-kopi.json') as my_file:
#     data= json.load(my_file)
#     for poi in data.keys():
#         dict += [[poi,data[poi]['coordinates'], data[poi]['floorname'],  data[poi]['buildingName'], data[poi]['maptext']]]
# print(dict)
app = Flask(__name__, static_url_path='',static_folder='../frontend/src/build', template_folder='?', )
CORS(app,support_credentials=True)

def get_connection():
    connection = psycopg2.connect(**config())
    connection.autocommit = True
    return connection

# with psycopg2.connect('') as con:'
#     with con.cursor() as cur:
#         cur.execute("""create table if not exists Point(
#             poiID integer, coordinates point, floorname integer, buildingName varchar, maptext varchar)""")
#         query_sql = """insert into Point
#         select * from dict"""
#         cur.execute(query_sql, dict)'
        
@app.route('/api/test/', methods=['GET','POST'])
def get_test():
    conn=get_connection() 
    if request.method=='GET':
        print(request.data)
        with closing(conn.cursor()) as cur:
            cur.execute(
                f"SELECT *\
                  FROM test;"
            )
            rows = cur.fetchall()
        print(rows)
        return list(rows)
    # if request.method=='POST':
    #     with closing(conn.cursor()) as cur:
    #         cur.execute("""create table if not exists Point(
    #             poiID integer, coordinates point, floorname integer, buildingName varchar, maptext varchar)""")
    #         for info in dict:
                
            
        
    
    # if request.method=='POST':
        
    #     with closing(conn.cursor()) as cur:
    #         cur.execute(
    #             f"INSERT INTO info(PunktID,StoyNiva, Vurdering, Korttilgang, Storrelse)\
    #             VALUES ({poiID},{stoy}, {vur}, {kort}, {storrelse} ) "
    #         )
    #         rows = cur.fetchall()
    #     print(rows)
    #     return list(rows)
            
            
# json_agg (st_asgeojson (points.*)::json)

if __name__ == '__main__':
    app.run(debug=True)