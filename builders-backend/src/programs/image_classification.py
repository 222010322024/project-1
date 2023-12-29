import os
import warnings
import sys

warnings.filterwarnings('ignore')
warnings.filterwarnings("ignore", category=DeprecationWarning, module="tensorflow")
warnings.filterwarnings("ignore", category=UserWarning, module="tensorflow")
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import numpy as np
from tensorflow.keras.preprocessing import image as keras_image
from tensorflow.keras.models import load_model

loaded_model = load_model(sys.argv[1])
image_path = sys.argv[2]



def classify_image(image_path, loaded_model):
    try:
        img = keras_image.load_img(image_path, target_size=(150, 150))
        img_array = keras_image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0

        predictions = loaded_model.predict(img_array)
        predicted_class_index = np.argmax(predictions)
        class_labels = ["Card", "Sign", "Vehicles", "ConstructionSite"] 
        predicted_class = class_labels[predicted_class_index]

        return predicted_class

    except Exception as e:
        return str(e)


predicted_class = classify_image(image_path, loaded_model)
print(predicted_class)

