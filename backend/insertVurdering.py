# from base import get_connection
# from contextlib import closing
# import json
# import random 

# with open('pointIds-kopi.json') as my_file:
#     data = json.load(my_file)
        
    
# conn = get_connection()
# for value in data:
#     poiId = value
#     StoyNiva = random.randint(1,5)
#     Vurdering = random.randint(1,5)
#     kapasitet = random.randint(1,10)
#     Korttilgang = bool(random.choice([True, False]))

#     with closing(conn.cursor()) as cur:
#             query_sql = """
#                 SELECT * FROM "Info" WHERE "PunktID" = %s
#                 """
#             cur.execute(query_sql, (poiId,))
#             existing_record = cur.fetchone()
#             if existing_record: 
#                 query_sql = """
#                     UPDATE "InfoS"
#                     SET "StoyNiva" = %s, "Vurdering" = %s, "Korttilgang" = %s, "Storrelse"= %s
#                     WHERE "PunktID" = %s
#                 """
#                 cur.execute(query_sql, (StoyNiva, Vurdering, Korttilgang, kapasitet, poiId))
#             else:   
#                 query_sql = """
#                         insert into "InfoS"("PunktID", "StoyNiva", "Vurdering", "Korttilgang", "Storrelse")
#                         values (%s, %s, %s, %s, %s)
#                         """  
#                 cur.execute(query_sql, (poiId, StoyNiva,Vurdering,Korttilgang,kapasitet))