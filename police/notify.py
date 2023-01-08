from pushbullet import Pushbullet
import file

def run(text:str): 
    pb = Pushbullet(file.API_KEY)
    push = pb.push_note("appel de la police!!!", text)
    print("station de police la plus proche : \n"+text)