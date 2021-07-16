const axios = require('axios')

const GET_NOTES = "note/GET_NOTES"
const GET_NOTE = "note/GET_NOTE"
const DELETE_NOTE = "note/DELETE_NOTE"
const EDIT_NOTE = 'note/EDIT_NOTE'
const POST_NOTE = "note/POST_NOTE"
const GET_ARCHIVED = "note/GET_ARCHIVED"
const GET_PINNED = 'note/PINNED'


const getNotes = (notes) => ({
    type: GET_NOTES,
    payload: notes,
})

const getNote = (note) => ({
    type: GET_NOTE,
    payload: note,
})

const editNote = (note) => ({
    type: EDIT_NOTE,
    payload: note,
})

const postNote = (note) => ({
    type: POST_NOTE,
    payload: note,
})

const deleteNote = (note) => ({
    type: DELETE_NOTE,
    payload: note,
})

const getArchived = (notes) => ({
    type: GET_ARCHIVED,
    payload: notes,
})

const getPinned = (notes) => ({
    type: GET_PINNED,
    payload: notes,
})


//thunks 
export const getAllNotes = () => async (dispatch) => {
    const response = await axios.get('/api/notes/')
    const notes = response.data
    if (response.status === 200) {
        dispatch(getNotes(notes))
        return response
    }
}
export const getArchivedNotes = () => async (dispatch) => {
    const response = await axios.get('/api/notes/archive')
    const notes = response.data
    if (response.status === 200) {
        dispatch(getArchived(notes))
        return response
    }
}
export const getPinnedNotes = () => async (dispatch) => {
    const response = await axios.get('/api/notes/pinned')
    const notes = response.data
    if (response.status === 200) {
        dispatch(getPinned(notes))
        return response
    }
}

export const postingNote = ({content, title, color, archived, pinned}) => async (dispatch) => {
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
            pinned

        }),
    });
    const data = await response.json();
    if (response.ok) {
        await dispatch(postNote(data.note))
    }
}

export const editingNote = ({noteId, content, title, color, archived, pinned}) => async (dispatch) => {
    const response = await fetch(`/api/notes/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            noteId,
            title,
            content,
            color,
            archived,
            pinned

        }),
    });
    const data = await response.json();
    if (response.ok) {
        await dispatch(editNote(data.note))
    }
}

export const deletingNote = (note) => async (dispatch) => {
    const response = await fetch(`/api/notes/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
           noteId: note.id

        }),
    });
    if (response.ok) {
        await dispatch(deleteNote(note))
        return response
    }
}

const initialSte = {
    notes: null,
    archived: null,
    pinned: null,
}

export default function noteReducer(state = initialSte, action) {
    let newState;
    switch (action.type) {
        case GET_NOTE:
            return {
                ...state
            }
    }
}

