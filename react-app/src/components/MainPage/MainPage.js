import React, { useEffect } from "react";
import { getAllNotes, getPinnedNotes } from "../../store/note";
import { useDispatch, useSelector, connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./MainPage.css";

function MainPage(props) {
  const dispatch = useDispatch();
  const { notes, user } = props;
  //   const notes = useSelector((state) => state.note.notes);
  //   const user = useSelector((state) =>
  //     state.session.user ? state.session.user : null
  //   );

  // const noteValue = Object.values(notes)
  // console.log(noteValue, "Note value")
  // const noteArchived = noteValue.filter(note => note.archived === false)
  // console.log("Not archived", noteArchived)

  useEffect(() => {
    if (user) {
      //   (async () => await dispatch(getAllNotes()))();
      dispatch(getAllNotes());
    }
  }, []);

  return (
    <div>
      <div className="notes-container">
        <h1>Notes:</h1>
        {notes &&
          Object.values(notes).map((note) => {
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
        {notes &&
          Object.values(notes).map((note) => {
            if (
              note.archived === false &&
              note.pinned === true &&
              user.id === note.user_id
            ) {
              return (
                <div
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
    user: state.session.user,
  };
};

export default connect(mapStateToProps, null)(MainPage);
