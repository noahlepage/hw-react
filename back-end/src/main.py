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

file_path = "./Database.csv"

def file_exists(file_path):
    return os.path.exists(file_path)


def load_content_from_database() : 
    
    with open(file_path, 'r') as csv_file:
        # Create a CSV dictionary reader object
        csv_reader = csv.DictReader(csv_file)

        # Iterate through each row in the CSV file
        for row in csv_reader:
        # Access columns by their names

        # [ID, Name]

            ls_of_user.add(User(row['ID'],row['Name'],row['Data']), row['time_spoken'])

    csv_file.close()

def check_if_we_recognize_voice_of_user(data) :
    # this part simply user the ai model to figure out what user this is 

    for user in ls_of_user :
        if user.get_data() == data :
            user.increase_time_spoken()
            return ls_of_user


    # TODO : add a way to manually enter the names of the users from the front end.
    ls_of_user.add(User(uuid.uuid4(),"aName",data, 1))

    return ls_of_user




async def audio_handler(websocket, path):
    while True:
        data = await websocket.recv()
        # Process audio data (perform voice recognition, etc.)
        print("Received audio data:", data)

        check_if_we_recognize_voice_of_user(data) # this takes the data and udpate the list of users



        # TODO : send the formatted output to the frontend, so it can display the result of our new computation. 



        response_data = "Recognition result: Hello, World!"
        await websocket.send(response_data)
    

    # TODO add closing routine, which save everything in Database.csv 



def init() :

    if file_exists(file_path):
        # open with read
        # load its content
        load_content_from_database()

    else:
        with open(file_path, 'w'):  # create a new file
            pass  # You can add code here if needed



# "localhost", 8765 -> if everything is runing locally 
# your-backend-ip-or-domain -> if we are running something on a server 

init()

start_server = websockets.serve(audio_handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

    
