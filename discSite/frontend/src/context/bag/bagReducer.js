import {
    SET_LOADING,
    ADD_INV_DISC,
    REMOVE_INV_DISC,
    UPDATE_DISC,
    ADD_BAG_DISC,
    REMOVE_BAG_DISC,
    CREATE_BAG,
    DELETE_BAG,
    SAVE_BAG,
    SAVE_INVENTORY,
    SEARCH_DISC,
    LOAD_DISCS,
    LOAD_USER
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case SET_LOADING:
            return {
              ...state,
              loading: true,
            };
        case SEARCH_DISC:
            return {
                ...state,
                discs: action.payload,
                loading: false,
            };
        case LOAD_DISCS:
            return {
                ...state,
                discs: action.payload,
                loading: false,
            };
        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        default:
            return state;
        // add a case for every type with the following pattern:
        // return {
        //      ...state,
        //      *state key being updated*: action.payload,
        //      loading: false,
        //  };
    }
};