import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../Modal/Modal";
import EditForm from "./EditForm";

function EditFormModal({ note, setEditShown }) {
  const modalToggle = (noteId) => {
    setEditShown(noteId);
  };

  const closeAll = (noteId) => {
    setEditShown(noteId);
  };

  return (
    <div onClick={() => modalToggle(note.id)}>
      <Modal onClose={() => closeAll(note.id)}>
        <EditForm note={note} setEditShow={setEditShown} />
      </Modal>
    </div>
  );
}

export default EditFormModal;
