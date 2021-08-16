import "./NoteForm.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { editingNote, deletingNote} from "../../../store/note";
import React, { useState, useEffect } from "react";
import * as colorAction from "../../../store/color";

const EditForm = ({ note, setShowModal}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const currentColor = useSelector((state) => state.color.setColor);
  const [content, setContent] = useState(note.content);
  const [title, setTitle] = useState(note.title);
  const [archived, setArchived] = useState(note.archived);
  const [pinned, setPinned] = useState(note.pinned);
  const [color, setColor] = useState(note.color);
  const [close, setClose] = useState(false);
  const [checkedCircle, setCheckCircle] = useState("white");
  const { settingColor } = colorAction;

  const handleDelete = async (noteId) => {
    await dispatch(deletingNote(noteId))
  }

  const onEditNote = async (e) => {
    e.preventDefault();
    if (note) {
      const noteId = note.id;
      await dispatch(
        editingNote({ noteId, title, content, color, archived, pinned })
      );
      //   setContent("");
      //   setTitle("");
      //   setArchived(false);
      //   setPinned(false);
      //   setColor("white");
     setShowModal(0);
    }
  };

  useEffect(() => {
    dispatch(settingColor(color));

    // document.addEventListener("submit", closeShown);
    // return () => document.removeEventListener("submit", closeShown);
  }, [close, color, checkedCircle]);

  const clickCircle = async (color) => {
    setColor(color);
  };

  const closeShown = () => {
   setShowModal(0);
    // let note = document.getElementsByClassName("form-container");
    // let display = note[0].style.display;
    // if (display === "flex") {
    //   note[0].style.display = "none";
    // } else {
    //   note[0].style.display = "flex";
    // }
  };

  const postTitle = (e) => {
    setTitle(e.target.value);
  };

  const postContent = (e) => {
    setContent(e.target.value);
  };

  const postColor = (e) => {
    setColor(e.target.value);
  };

  const postArchived = (e) => {
    if (archived === false && pinned === true) {
      setPinned(false);
      setArchived(true);
    } else if (archived === true && pinned === false) {
      setArchived(false);
      setPinned(false);
    } else {
      setArchived(true);
    }
  };

  const postPinned = (e) => {
    if (pinned === false && archived === true) {
      setPinned(true);
      setArchived(false);
    } else if (pinned === true && archived === false) {
      setPinned(false);
      setArchived(false);
    } else {
      setPinned(true);
    }
  };
  console.log(color);
  return (
    <div className="form-page">
      <div className="form-container" style={{ backgroundColor: `${color}` }}>
        <form onSubmit={onEditNote}>
          <div className="closeAndpinned">
            <div className="pinned-Button note-form">
              <button
                className="button-archived"
                type="submit"
                onClick={postPinned}
              >
                {pinned ? (
                  <i className="fas fa-thumbtack"></i>
                ) : (
                  <i className="fas fa-thumbtack" id="notePinned"></i>
                )}
              </button>
            </div>
          </div>
          <div className="text-divs">
            <div className="title-div">
              {/* <label>Title </label> */}
              <input
                type="text"
                name="Title"
                onChange={postTitle}
                value={title}
                className="input-title"
                placeholder="Title"
              ></input>
            </div>
            <div className="content-div">
              {/* <label>Content </label> */}
              <input
                type="text"
                name="Content"
                onChange={postContent}
                value={content}
                className="content-input"
                placeholder="Content"
              ></input>
            </div>
          </div>

          <div className="radio-color">
            <input
              type="radio"
              value={color}
              id="radioWhite"
              name="color"
              onChange={() => setColor("white")}
              checked={color === "white"}
              className="radio-btn"
            />
            <label htmlFor="radioWhite">
              <div
                className="color-circle white"
                style={{ backgroundColor: "white" }}
                onClick={() => clickCircle(color)}
              >
                {color === "white" ? <i className="fas fa-check"></i> : ""}{" "}
              </div>
            </label>
            <input
              type="radio"
              value={currentColor}
              name="color"
              onClick={() => setColor("red")}
              checked={color === "red"}
              id="radioRed"
            />
            <label htmlFor="radioRed" className="label-red">
              <div
                className="color-circle red"
                style={{ backgroundColor: "red" }}
                onClick={() => clickCircle(color)}
              >
                {color === "red" ? <i className="fas fa-check"></i> : ""}
              </div>
            </label>
            <input
              type="radio"
              value={color}
              name="color"
              onClick={() => setColor("blue")}
              checked={color === "blue"}
              id="radioBlue"
            />
            <label htmlFor="radioBlue">
              <div
                className="color-circle blue"
                style={{ backgroundColor: "blue" }}
                onClick={() => clickCircle(color)}
              >
                {color === "blue" ? <i className="fas fa-check"></i> : ""}
              </div>
            </label>
            <input
              type="radio"
              value={color}
              name="color"
              onClick={() => setColor("yellow")}
              checked={color === "yellow"}
              id="radioYellow"
            />
            <label htmlFor="radioYellow">
              <div
                className="color-circle yellow"
                style={{ backgroundColor: "yellow" }}
                onClick={() => clickCircle(color)}
              >
                {color === "yellow" ? <i className="fas fa-check"></i> : ""}
              </div>
            </label>
            <input
              type="radio"
              value={color}
              name="color"
              onClick={() => setColor("teal")}
              checked={color === "teal"}
              id="radioTeal"
            />
            <label htmlFor="radioTeal">
              <div
                className="color-circle teal"
                style={{ backgroundColor: "teal" }}
                onClick={() => clickCircle(color)}
              >
                {color === "teal" ? <i className="fas fa-check"></i> : ""}
              </div>
            </label>
            <input
              type="radio"
              value={color}
              name="color"
              onClick={() => setColor("purple")}
              checked={color === "purple"}
              id="radioPurple"
            />
            <label htmlFor="radioPurple">
              <div
                className="color-circle purple"
                style={{ backgroundColor: "purple" }}
                onClick={() => clickCircle(color)}
              >
                {color === "purple" ? <i className="fas fa-check"></i> : ""}
              </div>
            </label>
            <input
              type="radio"
              value={color}
              name="color"
              onClick={() => setColor("pink")}
              checked={color === "pink"}
              id="radioPink"
            />
            <label htmlFor="radioPink">
              <div
                className="color-circle pink"
                style={{ backgroundColor: "pink" }}
                onClick={() => clickCircle(color)}
              >
                {color === "pink" ? <i className="fas fa-check"></i> : ""}
              </div>
            </label>
            <input
              type="radio"
              value={color}
              name="color"
              onClick={() => setColor("green")}
              checked={color === "green"}
              id="radioGreen"
            />
            <label htmlFor="radioGreen">
              <div
                className="color-circle green"
                style={{ backgroundColor: "green" }}
                onClick={() => clickCircle(color)}
              >
                {color === "green" ? <i className="fas fa-check"></i> : ""}
              </div>
            </label>
            <input
              type="radio"
              value={color}
              name="color"
              onClick={() => setColor("gray")}
              checked={color === "gray"}
              id="radioGray"
            />{" "}
            <label htmlFor="radioGray">
              <div
                className="color-circle gray"
                style={{ backgroundColor: "gray" }}
                onClick={() => clickCircle(color)}
              >
                {color === "gray" ? <i className="fas fa-check"></i> : ""}
              </div>
            </label>
            <input
              type="radio"
              value={color}
              name="color"
              onClick={() => setColor("brown")}
              checked={color === "brown"}
              id="radioBrown"
            />
            <label htmlFor="radioBrown">
              <div
                className="color-circle brown"
                style={{ backgroundColor: "brown" }}
                onClick={() => clickCircle(color)}
              >
                {color === "brown" ? <i className="fas fa-check"></i> : ""}
              </div>
            </label>
            <input
              type="radio"
              value={color}
              name="color"
              onClick={() => setColor("orange")}
              checked={color === "orange"}
              id="radioOrange"
            />
            <label htmlFor="radioOrange">
              <div
                className="color-circle orange"
                style={{ backgroundColor: "orange" }}
                onClick={() => clickCircle(color)}
              >
                {color === "orange" ? <i className="fas fa-check"></i> : ""}
              </div>
            </label>
            <input
              type="radio"
              value={color}
              name="color"
              onClick={() => setColor("cornflowerblue")}
              checked={color === "cornflowerblue"}
              id="radioCornFlowerBlue"
            />
            <label htmlFor="radioCornFlowerBlue">
              <div
                className="color-circle cornflowerblue"
                style={{ backgroundColor: "cornflowerblue" }}
                onClick={() => clickCircle(color)}
              >
                {color === "cornflowerblue" ? (
                  <i className="fas fa-check"></i>
                ) : (
                  ""
                )}
              </div>
            </label>
          </div>
          <div className="postAndarchived-buttons">
            <div className="archived-button note-form">
              <button
                className="button-archived"
                type="submit"
                onClick={postArchived}
              >
                {archived ? (
                  <i className="far fa-caret-square-up"></i>
                ) : (
                  <i className="far fa-caret-square-down"></i>
                )}
              </button>
            </div>
            <div className="post-button note-form">
              <button className="button-post" type="submit">
                Post
              </button>
            </div>
            {archived ? ( <div className="delete-button note-form">
              <button
                className="button-delete"
                onClick={(e) => handleDelete(note.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
              
            ): null}
            <div className="close-button">
              <button className="button-close" onClick={closeShown}>
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
