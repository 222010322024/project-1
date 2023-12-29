from geopy.geocoders import Nominatim
from PIL import Image
from PIL.ExifTags import TAGS
import math
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

# Parse coordinates to decimal degrees
final_location = get_location(parse_coordinates(latitude_str), parse_coordinates(longitude_str))

print(final_location)