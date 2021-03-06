import { createAction, createReducer } from '@reduxjs/toolkit';
//import produce from "immer";
import { selectFreelances } from "../utils/selectors";


const initialState = {
    status: 'void',
    data: null,
    error: null,
}

const FETCHING = 'freelances/fetching'
const RESOLVED = 'freelances/resolved'
const REJECTED = 'freelances/rejected'

const freelancesFetching = createAction(FETCHING);
const freelancesResolved = createAction(RESOLVED, (data)=>({payload : data}));
const freelancesRejected = createAction(REJECTED);
//const freelancesRejected = (error) => ({ type: REJECTED, payload: error });

export async function fetchOrUpdateFreelances(store) {
    const status = selectFreelances(store.getState()).status
    if (status === 'pending' || status === 'updating') {
        return
    }
    store.dispatch(freelancesFetching())
    try {
        const response = await fetch('http://localhost:8000/freelances')
        const data = await response.json()
        store.dispatch(freelancesResolved(data))
    } catch (error) {
        store.dispatch(freelancesRejected(error))
    }
}

export default createReducer(initialState, builder => builder
    .addCase(freelancesFetching, (draft, action)=>{
        if (draft.status === 'void'){
            draft.status = 'pending'
            return
        }
        if (draft.status === 'rejected'){
            draft.status = 'pending'
            draft.error = null
            return
        }
        if (draft.status === 'resolved'){
            draft.status = 'updating'
            return
        }
        return
    })
    .addCase(freelancesResolved, (draft, action)=>{
        if (draft.status === "pending" || draft.status === "updating"){
            draft.data = action.payload;
            draft.status = 'resolved';
            return
        }
        return
    })
    .addCase(freelancesRejected, (draft, action)=>{
        if (draft.status === "pending" || draft.status === "updating"){
            draft.data = null;
            draft.error = action.payload;
            draft.status = 'rejected';
            return
        }
        return
    })

)

/*export function freelancesReducer (state = initialState, action){
    return produce(state, draft => {
        switch (action.type) {
            case FETCHING : {
                if (draft.status === 'void'){
                    draft.status = 'pending'
                    return
                }
                if (draft.status === 'rejected'){
                    draft.status = 'pending'
                    draft.error = null
                    return
                }
                if (draft.status === 'resolved'){
                    draft.status = 'updating'
                    return
                }
                return
            }
            case RESOLVED : {
                if (draft.status === "pending" || draft.status === "updating"){
                    draft.data = action.payload;
                    draft.status = 'resolved';
                    return
                }
                return
            }
            case REJECTED : {
                if (draft.status === "pending" || draft.status === "updating"){
                    draft.data = null;
                    draft.error = action.payload;
                    draft.status = 'rejected';
                    return
                }
                return
            }
            default : return;
        }
    })
}*/