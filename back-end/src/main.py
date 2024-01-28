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

ls_of_user = []

def file_exists(file_path):
    return os.path.exists(file_path)

file_path = "Database.csv"

if file_exists(file_path):
    # open with read
    # load its content
    load_content_from_database()

else:
    open(file_path, 'w') as file
    file.close

def load_content_from_database() : 
    
    with open(file_path, 'r') as csv_file:
    # Create a CSV dictionary reader object
    csv_reader = csv.DictReader(csv_file)

    # Iterate through each row in the CSV file
    for row in csv_reader:
        # Access columns by their names

        # [ID, Name]

        ls_of_user.add(User(row['ID'],row['Name'],row['Data']))

    csv_file.close()

def which_user_is_this(data) :
    # this part simply user the ai model to figure out what user this is 

    for user in ls_of_user :
        if user.get_data() == data :
            user.increase_time_spoken()
            return
    
    ls_of_user.add(User(uuid.uuid4(),"aName",data)
    return




async def audio_handler(websocket, path):
    while True:
        data = await websocket.recv()
        # Process audio data (perform voice recognition, etc.)
        print("Received audio data:", data)
        # current_user = which_user_is_this(data)

        response_data = "Recognition result: Hello, World!"
        await websocket.send(response_data)



# "localhost", 8765 -> if everything is runing locally 
# your-backend-ip-or-domain -> if we are running something on a server 
start_server = websockets.serve(audio_handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

    
