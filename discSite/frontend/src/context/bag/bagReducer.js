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
  LOAD_USER,
  LOAD_BAG,
  LOAD_INV,
} from "../types";

export default (state, action) => {
  switch (action.type) {
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
    case LOAD_BAG:
      return {
        ...state,
        bag: action.payload,
        loading: false,
      };
    case LOAD_INV:
      return {
        ...state,
        inventory: action.payload,
        loading: false,
      };
    case ADD_BAG_DISC:
      const discToUpdate = action.payload;
      // update inventory disc to "bagged: True"
      const updated = state.inventory.map((disc) => {
        if (disc.id === discToUpdate.id) {
          return discToUpdate;
        }
        return disc;
      });
      return {
        ...state,
        bag: [...state.bag, action.payload],
        inventory: updated,
      };
    case REMOVE_BAG_DISC:
      const updatedDisc = action.payload;
      // update inventory disc to "bagged: false"
      const updatedInv = state.inventory.map((disc) => {
        if (disc.id === updatedDisc.id) {
          return updatedDisc;
        }
        return disc;
      });
      return {
        ...state,
        bag: state.bag.filter((disc) => disc !== updatedDisc),
        inventory: updatedInv,
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
