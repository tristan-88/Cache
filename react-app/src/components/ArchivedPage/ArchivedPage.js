import "./ArchivedPage.css";
import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import EditFormModal from "../auth/NoteForm/EditForm";
import NavBar from "../NavBar/NavBar";
import {
  pinningNote,
  unArchivingNote,
  getAllNotes,
  getPinnedNotes,
  getArchivedNotes,
  deletingNote
} from "../../store/note";
import {Modal} from '../Modal/Modal'


function ArchivedPage(props) {
  const dispatch = useDispatch();
  const { archived, user, archivedLength } = props;
  const [archiveNoteShown, setArchiveNoteShown] = useState(0);
  const [showModal, setShowModal] = useState(0)

  useEffect(() => {
    if (user) {
      dispatch(getArchivedNotes());
      dispatch(getAllNotes());
      dispatch(getPinnedNotes());
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

  // const handleArchived = (archivedId) => {
  //   setArchiveNoteShown(archivedId);
  // };

  const handleDelete = async (noteId) => {
    await dispatch(deletingNote(noteId))
  }

  const pinning = (note) => {
    dispatch(pinningNote({ noteId: note.id, archived: note.archived }));
    dispatch(unArchivingNote({ noteId: note.id }));
  };

  const unarchiving = (note) => {
    dispatch(unArchivingNote({ noteId: note.id }));
  };

  return (
    <div className="main-page-container">
      <NavBar />
      <div className="notes-area">
        <h1 className="h1-archived">Archived</h1>

        <div className="archived-container">
          {archived.length &&
            // eslint-disable-next-line array-callback-return
            archived.map((note, idx) => {
              if (
                note.archived === true &&
                note.pinned === false &&
                user.id === note.user_id
              ) {
                return (
                  <div className="note-container" key={`archived-note-${idx}`}>
                    <div className="archived-notes-buttons">
                      <button
                        className="pinned-button"
                        onClick={() => pinning(note)}
                      >
                        <i className="fas fa-thumbtack" id="notePinned"></i>
                      </button>
                      <button
                        className="archived-button archive-page"
                        onClick={() => unarchiving(note)}
                      >
                        <i className="far fa-caret-square-up "></i>
                      </button>
                      <button
                        className="delete-button"
                        onClick={(e) => handleDelete(note.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>

                    <div
                      key={note.id}
                      className="note-div"
                      style={{ backgroundColor: `${note.color}` }}
                      onClick={() => setShowModal(note.id)}
                    >
                      <div className="note-content">{note.content}</div>
                    </div>
                    {showModal === note.id && (
                      <Modal onClose={() => setShowModal(0)}>
                        <EditFormModal
                          note={note}
                          setShowModal={setShowModal}
                        />
                      </Modal>
                    )}
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    archived: state.note.archived,
    user: state.session.user,
    archivedLength: state.note.archived.length,
  };
};

export default connect(mapStateToProps, null)(ArchivedPage);
