import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../Modal/Modal";
import EditForm from "./EditForm";

function EditFormModal({ note, setEditShown }) {
  const modalToggle = () => {
    setEditShown(1);
  };

  const closeAll = () => {
    setEditShown(0);
  };

  return (
    <div onClick={modalToggle}>
      <Modal onClose={closeAll}>
        <EditForm note={note} setEditShow={setEditShown} />
      </Modal>
    </div>
  );
}

export default EditFormModal;
