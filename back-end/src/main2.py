from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import pyaudio
import numpy as np
from scipy.io.wavfile import write
from pydub import AudioSegment as am
import random

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_bytes()
        if data is None:
            break
        temp = f"./src/temp/{int(random.random() * 1000)}.ogg"
        with open(temp, "wb") as f:
            f.write(data)
        data_ogg = am.from_file(temp) 
        data_ogg.export(temp.replace('ogg', 'wav'), format='wav')
        await websocket.send_text(f"Message text was: done writing")