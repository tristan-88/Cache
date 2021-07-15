from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextField, BooleanField
from wtforms.validators import ValidationError, DataRequired

class NoteForm(FlaskForm):
    title = StringField("Title")
    content = TextField("Take a note...")
    color = SelectField(u'Color', choices=[('red', 'Red'),
                                           ('blue', "Blue"),
                                           ('yellow', "Yellow"),
                                           ('teal', "Teal"),
                                           ('purple', "Purple"),
                                           ('pink', 'Pink'),
                                           ('green', 'Green'),
                                           ('gray', 'Gray'),
                                           ('brown', "Brown"),
                                           ('orange', "Orange"),
                                           ('darkblue', "Dark Blue"),
                                           ('white', "White"),])
    archived = BooleanField("Archived", false_values=None)
    pinned = BooleanField("Pinned", false_values=None)
    
    