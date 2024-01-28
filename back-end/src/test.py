import asyncio
import websockets 
from flask import Flask
from flask_cors import CORS
import os
import csv
from User import *

import uuid


app = Flask(__name__)
CORS(app)

def file_exists(file_path):
    return os.path.exists(file_path)


async def audio_handler(websocket, path):
    while True:
        data = await websocket.recv()
        # Process audio data (perform voice recognition, etc.)
        print("Backend received:", data)

        # TODO : send the formatted output to the frontend, so it can display the result of our new computation. 



        response_data = "Sending to frontend: Hello, World!"
        await websocket.send(response_data)
    

    # TODO add closing routine, which save everything in Database.csv 




# "localhost", 8765 -> if everything is runing locally 
# your-backend-ip-or-domain -> if we are running something on a server 

start_server = websockets.serve(audio_handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

    
