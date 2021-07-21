import "./NoteForm.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { postingNote } from "../../../store/note";
import React, { useState, useEffect } from "react";
import * as colorAction  from "../../../store/color"


const NoteForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [archived, setArchived] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [color, setColor] = useState("white");
  const [close, setClose] = useState(false);
    const [checkedCircle, setCheckCircle] = useState("white");
    const {settingColor} = colorAction

  const onPostNote = async (e) => {
    e.preventDefault();
    if (user) {
      await dispatch(postingNote({ title, content, color, archived, pinned }));
    }
  };

    const clickCircle = async (color) => {
        setCheckCircle(color)
  
  };

  const onClose = () => {
    setClose(true);
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
    if (archived === false) {
      setArchived(true);
    } else if (archived === true) {
      setArchived(false);
    }
  };

  useEffect(() => {
    if (close === true) {
      setClose(false);
    }
      if (color === checkedCircle) {
        dispatch(settingColor(color))
    }
      
  }, [close, color, checkedCircle]);

  const postPinned = (e) => {
    if (pinned === false) {
      setPinned(true);
    } else if (pinned === true) {
      setPinned(false);
    }
  };

  return (
      <div className="form-container" style={{backgroundColor: `${checkedCircle}` }} >
      <form onSubmit={onPostNote}>
        <div className="pinned-button">
          <button
            className="button-archived"
            type="submit"
            onClick={postPinned}
          >
            <i class="fas fa-thumbtack"></i>
          </button>
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="Title"
            onChange={postTitle}
            value={title}
          ></input>
        </div>
        <div>
          <label>Content</label>
          <input
            type="text"
            name="Content"
            onChange={postContent}
            value={content}
          ></input>
        </div>
        <div className="radio-color">
          <input
            type="radio"
            value={color}
            id="radioWhite"
            name="color"
            onChange={() => setColor("white")}
            checked={color == "white"}
            className="radio-btn"
          />
          <label for="radioWhite">
            <div
              className="color-circle white"
              style={{ backgroundColor: "white" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "white" ? <i class="fas fa-check"></i> : ""}{" "}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("red")}
            checked={color == "red"}
            id="radioRed"
          />
          <label for="radioRed" className="label-red">
            <div
              className="color-circle red"
              style={{ backgroundColor: "red" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "red" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("blue")}
            checked={color == "blue"}
            id="radioBlue"
          />
          <label for="radioBlue">
            <div
              className="color-circle blue"
              style={{ backgroundColor: "blue" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "blue" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("yellow")}
            checked={color == "yellow"}
            id="radioYellow"
          />
          <label for="radioYellow">
            <div
              className="color-circle yellow"
              style={{ backgroundColor: "yellow" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "yellow" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("teal")}
            checked={color == "teal"}
            id="radioTeal"
          />
          <label for="radioTeal">
            <div
              className="color-circle teal"
              style={{ backgroundColor: "teal" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "teal" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("purple")}
            checked={color == "purple"}
            id="radioPurple"
          />
          <label for="radioPurple">
            <div
              className="color-circle purple"
              style={{ backgroundColor: "purple" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "purple" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("pink")}
            checked={color == "pink"}
            id="radioPink"
          />
          <label for="radioPink">
            <div
              className="color-circle pink"
              style={{ backgroundColor: "pink" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "pink" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("green")}
            checked={color == "green"}
            id="radioGreen"
          />
          <label for="radioGreen">
            <div
              className="color-circle green"
              style={{ backgroundColor: "green" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "green" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("gray")}
            checked={color == "gray"}
            id="radioGray"
          />{" "}
          <label for="radioGray">
            <div
              className="color-circle gray"
              style={{ backgroundColor: "gray" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "gray" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("brown")}
            checked={color == "brown"}
            id="radioBrown"
          />
          <label for="radioBrown">
            <div
              className="color-circle brown"
              style={{ backgroundColor: "brown" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "brown" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("orange")}
            checked={color == "orange"}
            id="radioOrange"
          />
          <label for="radioOrange">
            <div
              className="color-circle orange"
              style={{ backgroundColor: "orange" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "orange" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
          <input
            type="radio"
            value={color}
            name="color"
            onClick={() => setColor("darkblue")}
            checked={color == "darkblue"}
            id="radioDarkBlue"
          />
          <label for="radioDarkBlue">
            <div
              className="color-circle darkblue"
              style={{ backgroundColor: "darkblue" }}
              onClick={() => clickCircle(color)}
            >
              {checkedCircle === "darkblue" ? <i class="fas fa-check"></i> : ""}
            </div>
          </label>
        </div>
        <div className="archived-button">
          <button
            className="button-archived"
            type="submit"
            onClick={postArchived}
          >
            <i class="fas fa-archive"></i>
          </button>
        </div>
        <div className="post-button">
          <button className="button-post" type="submit">
            Post
          </button>
        </div>
        <div className="close-button">
          <button className="button-close" type="submit" onClick={onClose}>
            <i class="fas fa-times"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
