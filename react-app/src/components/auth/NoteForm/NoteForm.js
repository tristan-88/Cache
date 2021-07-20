import "./NoteForm.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { postingNote } from "../../../store/note";
import React, { useState, useEffect } from "react";

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

  const onPostNote = async (e) => {
    e.preventDefault();
    if (user) {
      await dispatch(postingNote(content, title, color, archived, pinned));
    }
  };

  const close = () => {
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

  useEffect =
    (() => {
      setClose(false);
    },
    [close]);

  const postPinned = (e) => {
    if (pinned === false) {
      setPinned(true);
    } else if (pinned === true) {
      setPinned(false);
    }
  };
  return (
    <form onSubmit={onPostNote}>
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
          value={title}
        ></input>
      </div>
      <div className="radio-color">
        <input
          type="radio"
          value="white"
          name="White"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="red"
          name="Red"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="blue"
          name="Blue"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="yellow"
          name="Yellow"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="teal"
          name="Teal"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="purple"
          name="Purple"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="pink"
          name="Pink"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="green"
          name="Green"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="gray"
          name="Gray"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="brown"
          name="Brown"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="orange"
          name="Orange"
          onChange={(value) => postColor(value)}
        />
        <input
          type="radio"
          value="darkblue"
          name="Dark Blue"
          onChange={(value) => postColor(value)}
        />
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
      <div className="pinned-button">
        <button className="button-archived" type="submit" onClick={postPinned}>
          <i class="fas fa-thumbtack"></i>
        </button>
      </div>
      <div className="submit-button">
        <button className="button-post" type="submit">
          Post
        </button>
      </div>
      <div className="submit-button">
        <button className="button-close" type="submit" onClick={close}>
          <i class="fas fa-times"></i>
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
