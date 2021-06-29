from numpy.core.records import array
from tensorflow import keras
import tensorflow as tf
import numpy as np
import os
import matplotlib.pyplot as plt
print(os.curdir)
json_file = open('project1/model.json','r')
model_json = json_file.read()
model = tf.keras.models.model_from_json(model_json)
model.load_weights('project1/model.h5')

def predict(img):
    pred = model.predict([img])
    dic = dict()
    total = 0
    for x in range(10):
        total+=pred[0][x]
    for x in range(10):
        dic[x]=round(((pred[0][x]/total)*100),1)
    return dic 

