from .db import db
from sqlaclhemy.orm import relationship

class Note(db.Model):
    __tablename__ = "notes"
    id= db.Column(db.Integer, primary_key = True)
    ``