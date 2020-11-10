import { Add_Item, Remove_Item, Edit_Item } from '../Constants/userConstants';



var userVal = sessionStorage.getItem('UserInformation') ? JSON.parse(sessionStorage.getItem('UserInformation')) : []
var idval = sessionStorage.getItem('id') ? JSON.parse(sessionStorage.getItem('id')) : 0
const initialState = {

    userDetails: userVal,
    id: idval

}
export const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case Add_Item:
            var item = action.payload
            return {
                ...state,
                userDetails: [...state.userDetails, item],
                id: action.payload.id
            }

        case Remove_Item: return {
            ...state,
            userDetails: state.userDetails.filter(x => x.id !== action.payload)
        }



        case Edit_Item:
            var item = action.payload;
            var newarr = [];

            state.userDetails.filter(x => {
                if (x.id == Number(item.id)) {
                    newarr.push(item)
                }

                else {
                    newarr.push(x)
                }
            })

            return {
                ...state,
                userDetails: newarr
            }

        default: return state;
    }
}