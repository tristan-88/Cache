from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note
from app.forms import NoteForm
from sqlalchemy import desc, asc
from datetime import datetime

note_routes = Blueprint('notes', __name__)

@note_routes.route('/')
@login_required
def get_notes():
    notes = Note.query.order_by(Note.created_at.desc()).all() #check why I cannot use order_by.desc().all()
    return {"notes":{note.id: note.to_dict() for note in notes}}

@note_routes.route('/<int:id>')
@login_required
def get_note(id):
    note = Note.query.get(id)
    return note.to_dict()

@note_routes.route('/archive')
@login_required
def get_archive_notes():
    notes = Note.query.filter(Note.archived == True).all()
    return {"notes":{note.id: note.to_dict() for note in notes}}

@note_routes.route('/pinned')
@login_required
def get_pinned_notes():
    notes = Note.query.filter(Note.pinned == True).all()
    return {"notes":{note.id: note.to_dict() for note in notes}}


@note_routes.route('/', methods=["POST"])
@login_required
def post_note():
    new_title = request.json['title']
    new_content = request.json['content']
    new_color = request.json["color"]
    new_archived = request.json["archived"]
    new_pinned = request.json['pinned']
    note = Note(
        title = new_title,
        content = new_content,
        user_id = current_user.id,
        color = new_color,
        archived = new_archived,
        pinned = new_pinned,
        created_at = datetime.utcnow
        
    )
    db.session.add(note)
    db.session.commit()
    return {"note": note.to_dict()}

#update id to be passed in route
@note_routes.route('/<int:note_id>', methods=["PATCH"])
@login_required
def update_note(note_id):
    new_title = request.json['title']
    new_content = request.json['content']
    new_color = request.json["color"]
    new_archived = request.json["archived"]
    new_pinned = request.json['pinned']
    current_note = Note.query.get(note_id)
    current_note.title = new_title,
    current_note.content = new_content,
    current_note.user_id = current_user.id,
    current_note.color = new_color,
    current_note.archived = new_archived,
    current_note.pinned = new_pinned,
    current_note.created_at = datetime.utcnow
    db.session.commit()
    return {"note": current_note.to_dict()}


@note_routes.route('/<int:note_id>', methods=["DELETE"])
@login_required
def delete_note(note_id):
    note = Note.query.filter(Note.id == note_id and Note.archived == True).first()
    db.session.delete(note)
    db.session.commit()
    return {'message': "note has been deleted"}
    
    
    