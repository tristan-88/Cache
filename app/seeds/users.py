# from werkzeug.security import generate_password_hash
import faker
from app.models import db, User
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password', 
                avatar_url ="https://canary.contestimg.wish.com/api/webimage/5d7dd8619abb1f4feea0d1ab-large.jpg?cache_buster=170b6c55d8be415f8d3e2bd3e8dd38e5")

    db.session.add(demo)
    db.session.commit()
    
    for i in range(10):
        other = User(
            username=f'{faker.first_name()}{faker.random_int(0, 99)}',
            email=faker.safe_email(),
            password="password",
            avatar_url=f'{faker.Avatar.image_url(800,600)}'
        )
        db.session.add(other)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
