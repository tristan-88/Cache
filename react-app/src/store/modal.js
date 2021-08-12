const SHOW_SIGNUP = "modal/SHOW_SIGNUP"
const HIDE_SIGNUP = "modal/HIDE_SIGNUP"
const SHOW_LOGIN = 'modal/SHOW_LOGIN'
const HIDE_LOGIN = "modal/HIDE_LOGIN"

export const showSignUp = () => ({
    type: SHOW_SIGNUP,
})

export const hideSignUp = () => ({
    type: HIDE_SIGNUP,
})

export const showLogIn = () => ({
    type: SHOW_LOGIN,
})

export const hideLogIn = () => ({
    type: HIDE_LOGIN,
})

const initialState = {
    showLogIn: false,
    showSignUp: false,
}

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOGIN:
            return {
                ...state,
                showLogIn:true
            }
        case SHOW_SIGNUP:
            return {
                ...state,
                showSignUp: true
            }
        case HIDE_LOGIN:
            return {
                ...state,
                showLogIn: false
            }
        case HIDE_SIGNUP:
            return {
                ...state,
                showSignUp: false
            }
        default:
            return state
    }
}