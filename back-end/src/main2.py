from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import pyaudio
import numpy as np
from scipy.io.wavfile import write
from pydub import AudioSegment as am
import random
import librosa
from joblib import load

from model.predict import transfer_model, predict
import threading

app = FastAPI()
clf = load('./model/saved_model.joblib')

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_bytes()
        if data is None:
            break

        temp = f"./src/temp/{int(random.random() * 1000)}.wav"
        with open(temp, 'wb') as f:
            f.write(data)
        
        # with open(temp, "wb") as f:
        #     f.write(data)
        # data_ogg = am.from_file(temp, format='ogg') 
        # data_wav = temp.replace('ogg', 'wav')
        # data_ogg.export(data_wav, format='wav')
        # th = threading.Thread(target=predict, \
        #                       args=(temp, data, transfer_model, clf, websocket), \
        #                         daemon=True)  
        # th.start()

        sound, _ = librosa.load(data)
        res = predict(data, sound, transfer_model, clf)
        await websocket.send_text(f"Prediction: {res}")