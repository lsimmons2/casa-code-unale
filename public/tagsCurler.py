import json
import requests

data = {}
tags = []

for i in range(1,21):
    data = requests.get("https://api.stackexchange.com/2.2/tags?page="+str(i)+ "&pagesize=100&order=desc&sort=popular&site=stackoverflow").json()
    for j in range(len(data['items'])):
        tags.append(data['items'][j]['name'])

with open('./tags.js', 'a') as outfile:
    json.dump(tags, outfile, sort_keys = True, indent=2)

