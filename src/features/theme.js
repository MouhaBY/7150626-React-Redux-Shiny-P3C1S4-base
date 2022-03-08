export const DARK_MODE = "darkMode";


export function darkModeAction() {
    return {
        type : DARK_MODE
    }
}

export function themeReducer (state="light", action) {

    if (action.type === DARK_MODE){
        if(state === "light"){
            state = "dark"
            return state
        }
        else if (state === "dark"){
            state = "light"
            return state
        }
        else {
            state = "light"
            return state
        }
    }
    else return state
}


/*import produce from "immer";

export const DARK_MODE = "darkMode";


export function darkModeAction() {
    return {
        type : DARK_MODE
    }
}

export function themeReducer (state={theme:"light"}, action) {

    if (action.type === DARK_MODE){
        if(state.theme === "light"){
            return produce(state, draft => {draft.theme = "dark"})
        }
        else if (state.theme === "dark"){
            return produce(state, draft => {draft.theme = "light"})
        }
        else return produce(state, draft => {draft.theme = "light"})

    }
    else return state
}
*/