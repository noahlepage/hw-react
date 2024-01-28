import uuid


class User :

    def __init__(self,  user_id, name, data, time_spoken) :

        self.user_id = user_id
        self.name = name
        self.data = data

        self.time_spoken = time_spoken


    def get_name(self) :

        return self.name 

    def get_user_id(self) :

        return self.user_id
    
    def get_data(self) : 
        
        return self.data


    def increase_time_spoken(self) :

        self.time_spoken += 1


    


        