import json
import os
import math

from os import listdir
from os.path import isfile, join
from fastkml import kml


path = "./data/dry_canyon/"
files = [f for f in listdir(path) if isfile(join(path, f))]

js_file = "./static/js/data.js"

data = {}
high_value = 0

for filename in files:
    k = kml.KML()
    with open(path + filename, 'rt', encoding="utf-8") as myfile:
        doc = myfile.read()
    k.from_string(doc)

    features = list(k.features())
    a = list(features[0].features())
    try:
        b = list(a[1].features())[0]
    except Exception as e:
        print(f"{filename} failed to process")
        continue

    first = True
    prev_alt = 0
    for coord in b.geometry.coords:
        if first:
            prev_alt = coord[2]
            first = False
        alt_diff = (coord[2] - prev_alt)
        prev_alt = coord[2]

        if alt_diff > 40:
            alt_diff = 40

        if "{}|{}".format(coord[1], coord[0]) not in data:
            data["{}|{}".format(coord[1], coord[0])] = 0  
        data["{}|{}".format(coord[1], coord[0])] += alt_diff


with open(js_file, 'w') as outfile:
    outfile.write("var points = [")

with open(js_file, 'a') as outfile:
    for k, v in data.items():
        c1, c2 = k.split("|")
        if v < 0:
            continue
        outfile.write("{{location: new google.maps.LatLng({}, {}), weight: {}}},".format(c1, c2, v) + os.linesep)

with open(js_file, 'a') as outfile:
    outfile.write("]")
