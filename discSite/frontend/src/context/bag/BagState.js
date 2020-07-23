import React, { useReducer } from "react";
import axios from "axios";
import BagContext from "./bagContext";
import BagReducer from "./bagReducer";
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
    LOAD_USER,
    LOAD_DISCS,
    LOAD_BAG,
    LOAD_INV
} from '../types';

const BagState = props => {
    const initialState = {
        user: {},  // currently plannning on having user disc inventory and bags as arrays in user object
        discs: [],
        loading: false,
        inventory: [],
        bag: []
    };

    const [state, dispatch] = useReducer(BagReducer, initialState);

    const setLoading = () => dispatch({ type: SET_LOADING });

    // load users bag
    const loadBag = (data) => {
         dispatch({
             type: LOAD_BAG,
             payload: data,
         });
    }


    const loadInv = (data) => {
        dispatch({
            type: LOAD_INV,
            payload: data,
        });
    }
    // load user:
    const loadUser = async () => {
        setLoading();
        let url = "/user";
        const res = await axios.get(url);
        const bagData = res.data.bag;
        const invData = res.data.inventory;
        loadBag(bagData);
        loadInv(invData);

        dispatch({
            type: LOAD_USER,
            payload: res.data,
        });
    };

    // load discs
    const loadDiscs = async () => {
        setLoading();
        // let url = 'http://127.0.0.1:8000/api/v1/discs/';
        let url = "/discs";
        const res = await axios.get(url);

        dispatch({
            type: LOAD_DISCS,
            payload: res.data,
        });
    };

    // search discs
    const searchDiscs = async () => {
        setLoading();
        // let url = 'http://127.0.0.1:8000/api/v1/discs/';
        let url = "/discs";
        const res = await axios.get(url);

        dispatch({
            type: SEARCH_DISC,
            payload: res.data,
        });
    };

    // add disc to inventory

    // update disc details

    // remove disc from inventory

    // save inventory

    // create bag

    // add disc to bag

    // remove disc from bag

    // save bag

    // delete bag

    return (
        <BagContext.Provider
        value = {{
            user: state.user,
            discs: state.discs,
            loading: state.loading,
            bag: state.bag,
            inventory: state.inventory,
            searchDiscs,
            setLoading,
            loadUser,
            loadDiscs
        }}
        >
            {props.children}
        </BagContext.Provider>
    );
};

export default BagState;