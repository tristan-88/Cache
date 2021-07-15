from sqlalchemy.orm import backref, relationship
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  avatar_url = db.Column(db.String, default="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png")
  
  #Association
  user_note = relationship("Note", backref="note_user", cascade="all, delete")


  @property
  def password(self): #changing method to property
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    '''
    converts the 'password'  to hash to check if the the same as the original hashed password
    '''
    return check_password_hash(self.password, password) 


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "avatar_url": self.avatar_url,
      "notes": [note.to_dict() for note in self.user_note],
    }
