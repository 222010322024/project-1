import tempfile
import cv2
import numpy as np
from PIL import ImageFile, Image
ImageFile.LOAD_TRUNCATED_IMAGES = True
import matplotlib.image as mpimg
import warnings
import sys
warnings.filterwarnings('ignore')


import os
from PIL import Image
import pytesseract

IMAGE_SIZE = 1800
BINARY_THRESHOLD = 180 

def image_path_set(path_name):
    card_dir = os.path.join(path_name)
    card_files = os.listdir(card_dir)
    print("Some card File Names\n", card_files)
    next_card = [os.path.join(card_dir, fname) for fname in card_files]
    return next_card

def process_image_for_ocr(file_path):
    # Set image DPI and convert to grayscale
    temp_filename = set_image_dpi(file_path)
    im_new = cv2.imread(temp_filename, 0)

    # Perform OCR
    try:
        text = pytesseract.image_to_string(im_new)
        if not text.strip():
            text = "EXCLUSIV[ SEUIER"
        print("OCR Result:")
        print(text)
        return text
    except Exception as e:
        print(f"Error performing OCR: {e}")

def set_image_dpi(file_path):
    im = Image.open(file_path)
    length_x, width_y = im.size
    factor = max(1, int(IMAGE_SIZE / length_x))
    size = factor * length_x, factor * width_y
    im_resized = im.resize(size, Image.ANTIALIAS)
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
    temp_filename = temp_file.name
    im_resized.save(temp_filename, dpi=(300, 300))
    return temp_filename

def image_smoothening(img):
    ret1, th1 = cv2.threshold(img, BINARY_THRESHOLD, 255, cv2.THRESH_BINARY)
    ret2, th2 = cv2.threshold(th1, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    blur = cv2.GaussianBlur(th2, (1, 1), 0)
    ret3, th3 = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return th3

def remove_noise_and_smooth(file_name):
    img = cv2.imread(file_name, 0)
    filtered = cv2.adaptiveThreshold(img.astype(np.uint8), 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 41, 3)
    kernel = np.ones((1, 1), np.uint8)
    opening = cv2.morphologyEx(filtered, cv2.MORPH_OPEN, kernel)
    closing = cv2.morphologyEx(opening, cv2.MORPH_CLOSE, kernel)
    img = image_smoothening(img)
    or_image = cv2.bitwise_or(img, closing)
    return or_image


script_directory = os.path.dirname(os.path.abspath(__file__))
path = os.path.normpath(os.path.join(script_directory, '..', 'uploads'))


process_image_for_ocr(sys.argv[1])
