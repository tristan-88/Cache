import React, { useEffect, useState } from "react";
import {
  getAllNotes,
  getPinnedNotes,
  getArchivedNotes,
} from "../../store/note";
import { connect } from "react-redux";

import {
  pinningNote,
  unpinningNote,
  archivingNote,
  unArchivingNote,
} from "../../store/note";
import "./MainPage.css";
import NoteForm from "../auth/NoteForm/NoteForm";
// import EditForm from "../auth/NoteForm/EditForm";
import NavBar from "../NavBar/NavBar";
import EditFormModal from "../auth/NoteForm/EditForm";
import { Modal } from "../Modal/Modal";

function MainPage(props) {
  const {
    notes,
    pinned,
    pinnedLength,
    notesLength,
    user,
    getAllNotes,
    getPinnedNotes,
    getArchivedNotes,
    pinningNote,
    unpinningNote,
    archivingNote,
  } = props;
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
  const [showModal, setShowModal] = useState(0)
 
  useEffect(() => {
    if (user) {
      getAllNotes();
      getPinnedNotes();
      getArchivedNotes();
    }
    if (!isShown) return;
    const closeShown = () => {
      setIsShown(false);
      setEditShown(0);
    };

    if (!isEditShown) return;

    document.addEventListener("submit", closeShown);
    return () => document.removeEventListener("submit", closeShown);
  }, [notesLength, pinnedLength]);

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

  // const handleEdit = (noteId) => {
  //   setEditShown(noteId);
  // };

  return (
    <div className="main-page-container">
      <NavBar />
      <div className="notes-area">
        <div className="create-note-container">
          <div className="create-note" onClick={handleSumbit}>
            Take Note...
          </div>
        </div>
        {isShown && <NoteForm setIsShown={setIsShown} />}
        <h1 className="h1-pinned">Pinned Notes</h1>
        <div className="pinned-container">
          {pinned.length > 0 &&
            // eslint-disable-next-line array-callback-return
            pinned.map((note, idx) => {
              if (
                note.archived === false &&
                note.pinned === true &&
                user.id === note.user_id
              ) {
                return (
                  <div className="note-container" key={`pinned-note-${idx}`}>
                    <div className="main-notes-buttons">
                      <button
                        className="pinned-button main-page"
                        onClick={() =>
                          unpinningNote({
                            noteId: note.id,
                          })
                        }
                      >
                        <i className="fas fa-thumbtack"></i>
                      </button>
                      <button
                        className="archived-button main-page"
                        onClick={() =>
                          archivingNote({
                            noteId: note.id,
                            pinned: note.pinned,
                          })
                        }
                      >
                        <i className="far fa-caret-square-down"></i>
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
                    { showModal === note.id && 
                      <Modal onClose={() => setShowModal(0)}>
                      <EditFormModal note={note} setShowModal={setShowModal} />
                    </Modal>}
                  </div>
                );
              }
            })}
        </div>
        <h1 className="h1-notes">Notes</h1>
        <div className="notes-container">
          {notes.length > 0 &&
            // eslint-disable-next-line array-callback-return
            notes.map((note, idx) => {
              if (
                note.archived === false &&
                note.pinned === false &&
                user.id === note.user_id
              ) {
                return (
                  //82 - 86 refactor to a component
                  <div key={idx} className="note-container">
                    <div className="main-notes-buttons">
                      <button
                        className="pinned-button main-page"
                        onClick={() =>
                          pinningNote({
                            noteId: note.id,
                            archived: note.archived,
                          })
                        }
                      >
                        <i className="fas fa-thumbtack" id="notePinned"></i>
                      </button>
                      <button
                        className="archived-button main-page"
                        onClick={() =>
                          archivingNote({
                            noteId: note.id,
                            pinned: note.pinned,
                          })
                        }
                      >
                        <i className="far fa-caret-square-down"></i>
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
    notes: state.note.notes,
    pinned: state.note.pinned,
    user: state.session.user,
    notesLength: state.note.notes.length,
    pinnedLength: state.note.pinned.length,
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
    getArchivedNotes: () => {
      dispatch(getArchivedNotes());
    },
    pinningNote: (note) => {
      dispatch(pinningNote(note));
    },
    unpinningNote: (note) => {
      dispatch(unpinningNote(note));
    },
    archivingNote: (note) => {
      dispatch(archivingNote(note));
    },
    unArchivingNote: (note) => {
      dispatch(unArchivingNote(note));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
