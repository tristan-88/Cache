import "./ArchivedPage.css";
import React, { useEffect, useState } from "react";
import { getArchivedNotes } from "../../store/note";
import { useDispatch, useSelector, connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import EditForm from "../auth/NoteForm/EditForm";
import NavBar from "../NavBar/NavBar";

function ArchivedPage(props) {
  const dispatch = useDispatch();
  const { archived, user, update } = props;
  const [archiveNoteShown, setArchiveNoteShown] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(getArchivedNotes());
    }
    if (!archiveNoteShown) return;
    const closeShown = () => {
      archiveNoteShown(0);
    };
    document.addEventListener("submit", closeShown);
    return () => document.removeEventListener("submit", closeShown);
  }, [update]);

  if (!archived) {
    return null;
  }

  const handleArchived = (archivedId) => {
    setArchiveNoteShown(archivedId);
  };

  return (
    <div className='main-page-container'>
      <NavBar />
      <div className="archived-container">
        <h1>Archived:</h1>
        {archived.length &&
          archived.map((note) => {
            if (
              note.archived === true &&
              note.pinned === false &&
              user.id === note.user_id
            ) {
              return (
                <div>
                  <div
                    key={note.id}
                    className="note-div"
                    style={{ backgroundColor: `${note.color}` }}
                    onClick={() => handleArchived(note.id)}
                  >
                    <div className="note-content">{note.content}</div>
                  </div>
                  {archiveNoteShown === note.id && (
                    <EditForm note={note} setEditShown={setArchiveNoteShown} />
                  )}
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
    archived: state.note.archived,
    user: state.session.user,
    update: state.note.update,
  };
};

export default connect(mapStateToProps, null)(ArchivedPage);
