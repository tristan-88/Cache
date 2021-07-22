import React, { useEffect } from "react";
import { getAllNotes, getPinnedNotes } from "../../store/note";
import { useDispatch, useSelector, connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./MainPage.css";
import NoteForm from "../auth/NoteForm/NoteForm";

function MainPage(props) {
  const dispatch = useDispatch();
  const { notes,pinned, update, user } = props;
  //   const notes = useSelector((state) => state.note.notes);
  //   const user = useSelector((state) =>
  //     state.session.user ? state.session.user : null
  //   );

  // const noteValue = Object.values(notes)
  // console.log(noteValue, "Note value")
  // const noteArchived = noteValue.filter(note => note.archived === false)
  // console.log("Not archived", noteArchived)
  const notesChange = notes ? Object.values(notes) : {};

  useEffect(() => {
    if (user) {
      //   (async () => await dispatch(getAllNotes()))();
        dispatch(getAllNotes());
        dispatch(getPinnedNotes())
    }
  }, [update]);

    if (!notes) {
        return null
    }

  return (
    <div>
      <NoteForm />
      <div className="notes-container">
        <h1>Notes:</h1>
        {notes.length > 0 &&
          notes.map((note) => {
            if (
              note.archived === false &&
              note.pinned === false &&
              user.id === note.user_id
            ) {
              return (
                <div
                  key={note.id}
                  className="note-div"
                  style={{ backgroundColor: `${note.color}` }}
                >
                  <div className="note-content">{note.content}</div>
                </div>
              );
            }
          })}
      </div>
      <div className="pinned-container">
        <h1>Pinned Notes:</h1>
        {pinned.length > 0 &&
          pinned.map((note) => {
            if (
              note.archived === false &&
              note.pinned === true &&
              user.id === note.user_id
            ) {
              return (
                <div
                  key={note.id}
                  className="note-div"
                  style={{ backgroundColor: `${note.color}` }}
                >
                  <div className="note-content">{note.content}</div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    notes: state.note.notes,
      pinned: state.note.pinned,
    update:state.note.update,
    user: state.session.user,
  };
};

export default connect(mapStateToProps, null)(MainPage);
