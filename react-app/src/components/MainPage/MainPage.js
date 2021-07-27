import React, { useEffect, useState } from "react";
import { getAllNotes, getPinnedNotes } from "../../store/note";
import { useDispatch, useSelector, connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./MainPage.css";
import NoteForm from "../auth/NoteForm/NoteForm";
import EditForm from "../auth/NoteForm/EditForm";

function MainPage(props) {
  const { notes, pinned, update, user, getAllNotes, getPinnedNotes } = props;
  //   const notes = useSelector((state) => state.note.notes);
  //   const user = useSelector((state) =>
  //     state.session.user ? state.session.user : null
  //   );

  // const noteValue = Object.values(notes)
  // console.log(noteValue, "Note value")
  // const noteArchived = noteValue.filter(note => note.archived === false)
  // console.log("Not archived", noteArchived)
  const [isShown, setIsShown] = useState(false);
  const [isEditShown, setEditShown] = useState(0);

  useEffect(() => {
    if (user) {
      getAllNotes();
      getPinnedNotes();
    }
    if (!isShown) return;
    const closeShown = () => {
      setIsShown(false);
      setEditShown(0)
    };

    if (!isEditShown) return;

    document.addEventListener("submit", closeShown);
    return () => document.removeEventListener("submit", closeShown);
  }, [update]);

  if (!notes) {
    return null;
  } else if (!pinned) {
    return null;
  }

  const handleSumbit = () => {
    setIsShown(true);
    // let note = document.getElementsByClassName("create-note")
    // let display = note[0].style.display

    // if (display === "block") {
    //   note[0].style.display = "none"
    // } else {
    //   note[0].style.display = "block"
    // }
  };

  const handleEdit = (noteId) => {
    setEditShown(noteId);

  };

  return (
    <div>
      <div className="create-note-container">
        <div className="create-note" onClick={handleSumbit}>
          Take Note...
        </div>
      </div>

      {isShown && <NoteForm setIsShown={setIsShown} />}
      <h1 className="h1-notes">Notes</h1>
      <div className="notes-container">
        {notes.length > 0 &&
          notes.map((note) => {
            if (
              note.archived === false &&
              note.pinned === false &&
              user.id === note.user_id
            ) {
              return (
                <div>
                  <div
                    key={note.id}
                    className="note-div"
                    style={{ backgroundColor: `${note.color}` }}
                    onClick={() => handleEdit(note.id)}
                  >
                    <div className="note-content">{note.content}</div>
                  </div>
                  {isEditShown === note.id &&
                    <EditForm note={note} setEditShown={setEditShown} />
                  }
                </div>
              );
            }
          })}
      </div>
      <h1 className="h1-pinned">Pinned Notes</h1>
      <div className="pinned-container">
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
    update: state.note.update,
    user: state.session.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotes: () => {
      dispatch(getAllNotes());
    },
    getPinnedNotes: () => {
      dispatch(getPinnedNotes());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
