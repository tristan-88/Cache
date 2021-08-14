import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../Modal/Modal";
import EditForm from "./EditForm";

function EditFormModal({ note, setShowModal }) {
 

  return (
    
        <EditForm note={note} setShowModal={setShowModal} />
      
  );
}

export default EditFormModal;
