import "./ArchivedPage.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import EditForm from "../auth/NoteForm/EditForm";
import NavBar from "../NavBar/NavBar";
import {
  pinningNote,
  unpinningNote,
  archivingNote,
  unArchivingNote,
  getAllNotes,
  getPinnedNotes,
  getArchivedNotes
} from "../../store/note";

function ArchivedPage(props) {
  const dispatch = useDispatch();
  const { archived, user, archivedLength} = props;
  const [archiveNoteShown, setArchiveNoteShown] = useState(0);
  

  useEffect(() => {
    if (user) {
      dispatch(getArchivedNotes());
      dispatch(getAllNotes())
      dispatch(getPinnedNotes())
    }
    if (!archiveNoteShown) return;
    const closeShown = () => {
      archiveNoteShown(0);
    };
    document.addEventListener("submit", closeShown);
    return () => document.removeEventListener("submit", closeShown);
  }, [archivedLength]);

  if (!archived) {
    return null;
  }

  const handleArchived = (archivedId) => {
    setArchiveNoteShown(archivedId);
  };

  const pinning = (note) => {
    dispatch(pinningNote({ noteId: note.id, archived: note.archived }))
    dispatch(unArchivingNote({ noteId: note.id }));
  }

  const unarchiving = (note) => {
    dispatch(unArchivingNote({noteId: note.id}))
  }

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
                  <button
                    className="pinned-button"
                    onClick={() => pinning(note)}
                  >
                    <i className="fas fa-thumbtack"></i>
                  </button>
                  <button
                    className="archived-button"
                    onClick={() => unarchiving(note)}
                  >
                    <i className="far fa-caret-square-up"></i>
                  </button>
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
    archivedLength: state.note.archived.length
  };
};

export default connect(mapStateToProps, null)(ArchivedPage);
