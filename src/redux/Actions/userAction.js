import { Add_Item, Remove_Item, Edit_Item } from '../Constants/userConstants';


export const addItemTable = (userInfo) => async (dispatch, getState) => {

    var { id, firstName, lastName, age, email, active, stateInfo, country, phone, photo } = userInfo;
    dispatch({
        type: Add_Item,
        payload: { id, firstName, lastName, age, email, active, stateInfo, country, phone, photo }
    })
    sessionStorage.setItem('UserInformation', JSON.stringify(getState().userDetails));
    sessionStorage.setItem('id', JSON.stringify(getState().id));
}


export const deleteItemTable = (id) => async (dispatch, getState) => {

    dispatch({
        type: Remove_Item,
        payload: id
    })

    sessionStorage.setItem('UserInformation', JSON.stringify(getState().userDetails));
    sessionStorage.setItem('id', JSON.stringify(getState().id));
}

export const updateItemTable = (userInfo) => async (dispatch, getState) => {

    var { id, firstName, lastName, age, email, active, stateInfo, country, phone, photo } = userInfo;
    dispatch({
        type: Edit_Item,
        payload: { id, firstName, lastName, age, email, active, stateInfo, country, phone, photo }
    })

    sessionStorage.setItem('UserInformation', JSON.stringify(getState().userDetails));
    sessionStorage.setItem('id', JSON.stringify(getState().id));
}

