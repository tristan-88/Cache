import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../Modal/Modal"
import EditForm from "./EditForm";


function EditFormModal({ note, setEditShown }) {
  

  const modalToggle = () => {
    setEditShown(true);
    
  };

  const closeAll = () => {
    setEditShown(false);
    
  };

  return (
    <Modal onClose={closeAll}>
      <EditForm note={note} setEditShow={setEditShown} />
    </Modal>
  );
}

export default EditFormModal;
