from pushbullet import Pushbullet
import file

def run(text:str): 
    pb = Pushbullet(file.API_KEY)
    push = pb.push_note("Nouveau accident enregistrĂ©!", text)
    print("accident enregistrĂ© : \n"+text)