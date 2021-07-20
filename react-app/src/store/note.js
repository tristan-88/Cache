const axios = require("axios");

const GET_NOTES = "note/GET_NOTES";
const GET_NOTE = "note/GET_NOTE";
const DELETE_NOTE = "note/DELETE_NOTE";
const EDIT_NOTE = "note/EDIT_NOTE";
const POST_NOTE = "note/POST_NOTE";
const GET_ARCHIVED = "note/GET_ARCHIVED";
const GET_PINNED = "note/PINNED";

const getNotes = (notes) => ({
  type: GET_NOTES,
  payload: notes,
});

const getNote = (note) => ({
  type: GET_NOTE,
  payload: note,
});

const editNote = (note) => ({
  type: EDIT_NOTE,
  payload: note,
});

const postNote = (note) => ({
  type: POST_NOTE,
  payload: note,
});

const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: noteId,
});

const getArchived = (notes) => ({
  type: GET_ARCHIVED,
  payload: notes,
});

const getPinned = (notes) => ({
  type: GET_PINNED,
  payload: notes,
});

//thunks
export const getAllNotes = () => async (dispatch) => {
  const response = await axios.get("/api/notes/");
  const data = response.data;
  if (response.status === 200) {
    dispatch(getNotes(data.notes));
    return response;
  }
};
export const getArchivedNotes = () => async (dispatch) => {
  const response = await axios.get("/api/notes/archive");
  const data = response.data;
  if (response.status === 200) {
    dispatch(getArchived(data.notes));
    return response;
  }
};
export const getPinnedNotes = () => async (dispatch) => {
  const response = await axios.get("/api/notes/pinned");
  const data = response.data;
  if (response.status === 200) {
    dispatch(getPinned(data.notes));
    return response;
  }
};

export const postingNote =
  ({ content, title, color, archived, pinned }) =>
  async (dispatch) => {
    const response = await fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        color,
        archived,
        pinned,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      await dispatch(postNote(data.note));
    }
  };

export const editingNote =
  ({ noteId, content, title, color, archived, pinned }) =>
  async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        color,
        archived,
        pinned,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      await dispatch(editNote(data.note));
    }
  };

export const deletingNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(deleteNote(noteId));
    return response;
  }
};

const initialState = {
  notes: null,
  archived: null,
  pinned: null,
};

export default function noteReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case GET_ARCHIVED:
      return {
        ...state,
        archived: action.payload,
      };
    case GET_PINNED:
      return {
        ...state,
        pinned: action.payload,
      };
    case DELETE_NOTE:
      newState = Object.assign({}, state);
      delete newState.archived[action.payload];
      return newState;
    case EDIT_NOTE:
      newState = Object.assign({}, state);
      newState.notes[action.payload.id] = action.payload;
      if (action.payload.archived === true) {
        try {
          delete newState.notes[action.payload.id];
          delete newState.pinned[action.payload.id];
        } catch (error) {
          console.log(error);
        }
        newState.archived[action.payload.id] = action.payload;
      }
      if (action.payload.pinned === true) {
        try {
          delete newState.notes[action.payload.id];
          delete newState.archived[action.payload.id];
        } catch (error) {
          console.log(error);
        }
        newState.pinned[action.payload.id] = action.payload;
      }
          return newState;
      case POST_NOTE:
          newState = Object.assign({}, state)
          newState.notes[action.payload.id] = action.payload
          return newState
    default:
      return state;
  }
}
