from geopy.geocoders import Nominatim
from PIL import Image
from PIL.ExifTags import TAGS
import math
import json
import requests
import sys

img_file = sys.argv[1]
image = Image.open(img_file)

cordinate_geo = """"""
final_location = ""
exif = {}
try:
    for tag, value in image._getexif().items():
        if tag in TAGS:
            exif[TAGS[tag]] = value

        if 'GPSInfo' in exif:
            geo_cordinate = f"""{math.floor(exif['GPSInfo'][2][0])}°{math.floor(exif['GPSInfo'][2][1])}'{exif['GPSInfo'][2][2]}"{exif['GPSInfo'][1]} {math.floor(exif['GPSInfo'][4][0])}°{math.floor(exif['GPSInfo'][4][1])}'{exif['GPSInfo'][4][2]}"{exif['GPSInfo'][3]}"""

            cordinate_geo += geo_cordinate
            break
except:
    print("No Exif Data present in the image, please try with other image")

def dms_to_dd(degrees, minutes, seconds, direction):
    dd = float(degrees) + float(minutes)/60 + float(seconds)/(60*60)
    if direction == 'S' or direction == 'W':
        dd *= -1  # Make coordinates negative for south or west
    return dd


def parse_coordinates(coord_string):
    # Split the coordinate string into parts
    deg = coord_string.split('°')
    # print(deg)
    min = deg[1].split("'")
    # print(min)
    sec = min[1].split('"')
    # print(sec)
    # Extract degrees, minutes, seconds, and direction
    degrees = deg[0]
    minutes = min[0]
    seconds = sec[0]
    direction = sec[1]

    # Convert to decimal degrees
    dd = dms_to_dd(degrees, minutes, seconds, direction)

    return dd

def get_location(latitude, longitude):
    # Format the coordinates
    coordinates = f"{latitude}, {longitude}"

    # Initialize the geolocator
    geolocator = Nominatim(user_agent="location_converter")

    # Get the location information
    location = geolocator.reverse(coordinates)

    return location.address


latitude_str = cordinate_geo.split(""" """)[0]
longitude_str = cordinate_geo.split(""" """)[1]


url = f"https://api.foursquare.com/v3/places/search?query=places&ll={str(parse_coordinates(latitude_str))}%2C{str(parse_coordinates(longitude_str))}&radius=500&categories=11001%2C%2011003%2C%2011009%2C%2011020%2C%2011021%2C%2011023%2C%2011033%2C%2011034%2C%2011040%2C%2011042%2C%2011045"

# url = "https://api.foursquare.com/v3/places/search"

headers = {
    "accept": "application/json",
    "Authorization": sys.argv[2]
}

response = requests.get(url, headers=headers)

data = json.loads(response.text)

# Extract name, category, and formatted address information
places_dict = {}
for result in data.get('results', []):
    name = result.get('name')
    category_name = result.get('categories', [{}])[0].get('name')  # Assuming there is at least one category
    formatted_address = result.get('location', {}).get('formatted_address')

    if name and category_name and formatted_address:
        places_dict[name] = {
            'category': category_name,
            'formatted_address': formatted_address
        }


# Print the dictionary
for name, info in places_dict.items():
    print(f"{name}: Category - {info['category']}, Address - {info['formatted_address']}")