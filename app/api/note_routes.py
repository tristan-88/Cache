from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note
from app.forms import NoteForm
from sqlalchemy import desc, asc

note_routes = Blueprint('notes', __name__)

@note_routes.route('/')
@login_required
def get_notes():
    notes = Note.query.all() #check why I cannot use order_by.desc().all()
    return {"notes":{note.id: note.to_dict() for note in notes}}

@note_routes.route('/<int:id>')
@login_required
def get_note(id):
    note = Note.query.get(id)
    return note.to_dict()

