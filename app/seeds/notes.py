from app.models import db, Note
from faker import Faker
import random
from datetime import datetime

now = datetime.now()
faker = Faker()
colors = ["darkblue", 'orange', 'white', "gray",'yellow', 'blue', 'red', 'green', 'pink', 'purple', 'brown', 'teal']
boolean = [True, False]

def seed_notes():
    
    for i in range(100):
        note = Note(
            title = faker.word(),
            content = faker.sentence(),
            user_id = faker.random_int(1, 10),
            color = random.choice(colors), #random.choice gives a random value from iterable passed inside
            archived = random.choice(boolean),
            pinned = random.choice(boolean), 
            created_at = now.strftime("%Y-%m-%d %H:%M:%S")
        )
        db.session.add(note)
    db.session.commit()
    
def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()