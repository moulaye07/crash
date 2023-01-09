from pushbullet import Pushbullet
API_KEY = "o.fAmUwpBlJnbyZRu8Y8lEY1n6AekNraVn"
text="Cas de noyade détecté..."

def run(): 
    pb = Pushbullet(API_KEY)
    push = pb.push_note("Urgence!!!", text)
