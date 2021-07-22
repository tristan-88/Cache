import React, { useEffect, useState } from "react";
import { getAllNotes, getPinnedNotes } from "../../store/note";
import { useDispatch, useSelector, connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./MainPage.css";
import NoteForm from "../auth/NoteForm/NoteForm";

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

  useEffect(() => {
    if (user) {
      getAllNotes();
      getPinnedNotes();
    }
    if (!isShown) return;
    const closeShown = () => {
      setIsShown(false);
    };

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

  return (
    <div>
      <div className="create-note-container">
        <div className="create-note" onClick={handleSumbit}>
          Take Note...
        </div>
      </div>

      {isShown && <NoteForm />}
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
