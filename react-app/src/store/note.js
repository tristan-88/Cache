const axios = require("axios");

const GET_NOTES = "note/GET_NOTES";
const GET_NOTE = "note/GET_NOTE";
const DELETE_NOTE = "note/DELETE_NOTE";
const EDIT_NOTE = "note/EDIT_NOTE";
const POST_NOTE = "note/POST_NOTE";
const GET_ARCHIVED = "note/GET_ARCHIVED";
const GET_PINNED = "note/GET_PINNED";
const ADD_PINNED = "note/ADD_PINNED";
const REMOVED_PINNED = "note/REMOVED_PINNED";
const ADD_ARCHIVED = "note/ADD_ARCHIVED";
const REMOVED_ARCHIVED = "note/REMOVED_ARCHIVED";

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

const pinNote = (noteData) => ({
  type: ADD_PINNED,
  payload: noteData,
});

const unpinNote = (noteData) => ({
  type: REMOVED_PINNED,
  payload: noteData,
});

const archiveNote = (noteData) => ({
  type: ADD_ARCHIVED,
  payload: noteData,
});

const unArchiveNote = (noteData) => ({
  type: REMOVED_ARCHIVED,
  payload: noteData,
});

//thunks

//this routes get all the notes that arent pinned or archived
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
  const response = await axios.get("/api/notes/pin");
  const data = response.data;
  if (response.status === 200) {
    dispatch(getPinned(data.notes));
    return response;
  }
};

export const postingNote =
  ({ title, content, color, archived, pinned }) =>
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

export const pinningNote =
  ({ noteId, archived }) =>
  async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/pin`, {
      method: "PATCH",
    });
    const data = await response.json();
    if (response.ok) {
      await dispatch(pinNote({
        newNote: data.note,
      archived}));
    }
  };

export const unpinningNote =
  ({ noteId }) =>
  async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/unpin`, {
      method: "PATCH",
    });
    const data = await response.json();
    if (response.ok) {
      await dispatch(unpinNote({ newNote:data.note }));
    }
  };

export const archivingNote =
  ({ noteId, pinned }) =>
  async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/archive`, {
      method: "PATCH",
    });
    const data = await response.json();
    if (response.ok) {
      await dispatch(archiveNote({newNote: data.note, pinned}));
    }
  };

export const unArchivingNote =
  ({ noteId }) =>
  async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/unarchive`, {
      method: "PATCH",
    });
    const data = await response.json();
    if (response.ok) {
      await dispatch(unArchiveNote({ newNote: data.note}));
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
  notes: [],
  archived: [],
  pinned: [],
};

export default function noteReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: Object.values(action.payload),
      };
    case GET_ARCHIVED:
      return {
        ...state,
        archived: Object.values(action.payload),
      };
    case GET_PINNED:
      return {
        ...state,
        pinned: Object.values(action.payload),
      };
    case DELETE_NOTE:
      newState = Object.assign({}, state);
      newState.archived = state.archived.filter(
        (note) => note.id !== action.payload
      );
      //   delete newState.archived[action.payload];
      return newState;
    case ADD_PINNED:
      newState = Object.assign({}, state)
      if (action.payload.archived) {
          newState.archived = newState.archived.filter(note => note.id !== action.payload.newNote.id)
      } else {
        newState.notes = newState.notes.filter(note => note.id !== action.payload.newNote.id)
      }
      newState.pinned.push(action.payload.newNote)
      return newState
    case REMOVED_PINNED:
      newState = Object.assign({}, state)
      newState.pinned = newState.archived.filter(note => note.id !== action.payload.newNote.id)
      newState.notes.push(action.payload.newNote)
      return newState
    case ADD_ARCHIVED:
      newState = Object.assign({}, state)
      if (action.payload.pinned) {
        newState.pinned = newState.pinned.filter(note => note.id !== action.payload.newNote.id)
      } else {
        newState.notes = newState.notes.filter(note => note.id !== action.payload.newNote.id)
      }
      newState.archived.push(action.payload.newNote)
      return newState
    case REMOVED_ARCHIVED:
      newState = Object.assign({}, state)
      newState.archived = newState.archived.filter(note => note.id !== action.payload.newNote.id)
      newState.notes.push(action.payload.newNote)
      return newState
    case EDIT_NOTE:
      newState = Object.assign({}, state);
      newState.notes = newState.notes.filter(note => note.id !== action.payload.id)
      newState.archived= newState.archived.filter(note => note.id !== action.payload.id)
      newState.pinned = newState.pinned.filter(note => note.id !== action.payload.id)
      if (action.payload.pinned) {
        newState.pinned.push(action.payload)
      } else if (action.payload.archived) {
        newState.archived.push(action.payload)
      } else {
        newState.notes.push(action.payload)
      }
      return newState;
    case POST_NOTE:
      newState = Object.assign({}, state);
      if (action.payload.archived === true) {
        newState.archived.push(action.payload);
      } else if (action.payload.pinned === true) {
      
        newState.pinned.push(action.payload);
      } else {
        
        newState.notes.push(action.payload);
      }
      return newState;
    default:
      return state;
  }
}
