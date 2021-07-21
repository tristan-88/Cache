const SET_COLOR = 'color/SET_COLOR';
const REMOVE_COLOR = "color/REMOVE_COLOR";

export const settingColor = (color) => ({
    type: SET_COLOR,
        payload: color,
})

export const removingColor = (color) => ({
    type: REMOVE_COLOR,
    payload: color
})


const initialState = {
    setColor: '',
    removeColor: '',
}


export default function colorReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COLOR:
            return {
                ...state,
                settingColor: action.payload,
                
            }
        case REMOVE_COLOR:
            return {
                ...state,
                removeColor: action.payload,
            }
        default:
            return state
    }
}