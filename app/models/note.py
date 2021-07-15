from .db import db
from sqlalchemy.orm import relationship
from datetime import date, datetime

class Note(db.Model):
    __tablename__ = "notes"
    
    
    id= db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100))
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    color = db.Column(db.String, default="white")
    archived = db.Column(db.Boolean, default=False, nullable=False)
    pinned = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    

    def to_dict(self):
        return{
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "user_id": self.user_id,
            "color": self.color,
            "archived": self.archived,
            "pinned": self.pinned,
            "created_at": self.created_at,
        }