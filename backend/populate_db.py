from base import get_connection
from contextlib import closing
import json

with open('infos-kopi.json') as my_file:
    data = json.load(my_file)
    # for key, value in data.items():
    #     print(f"{key}: {value}")
        
    
conn = get_connection()
with closing(conn.cursor()) as cur:
    for key, value in data.items():    
        query_sql = """
                    insert into "Punkter"("poiID", coordinates, floorname, "buildingName", maptext) 
                    values (%s, st_geomfromtext(%s, 4326), %s, %s, %s)
                    """  
        cur.execute(query_sql, (key, f'POINT({value["coordinates"][0]} {value["coordinates"][1]})', value["floorname"], value["buildingName"], value["maptext"]))
