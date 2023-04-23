import numpy as np
import requests
import json 

points = []
urls = ['https://api.mazemap.com/api/campus/1/poitypes/4232/pois/', 'https://api.mazemap.com/api/campus/21/poitypes/16/pois/', 'https://api.mazemap.com/api/campus/18/poitypes/7/pois/', 'https://api.mazemap.com/api/campus/3/poitypes/7/pois/']
for url in urls:
    try:
        response = requests.get(url)
        data = json.loads(response.content)
        points.extend([poi['poiId'] for poi in data['pois']])
    except json.decoder.JSONDecodeError as e:
        print(f"Error1: {e}")
        print(response.content)
        continue


infos =[]
for poi in points:
    try:
        response = requests.get(f'https://api.mazemap.com/api/pois/{poi}/?srid=4326') 
        data = json.loads(response.content)
        if (not(data['point'] == None) and not(data['mapText'] == None)):
            poi_info = {
                'coordinates': data['point']['coordinates'],
                'floorname': data['floorName'],
                'buildingName': data['buildingName'],
                'maptext': data['mapText']
            }
            infos.append((data['poiId'], poi_info))
        else: 
            points.remove(poi)
            points.remove(poi)
    except json.decoder.JSONDecodeError as e:
        print(f"Error2: {e}")
        print(response.content)
        continue

with open('infos.json', 'w') as f:
    json.dump(dict(infos), f)

with open('pointIds.json', 'w') as f:
    json.dump(points, f)