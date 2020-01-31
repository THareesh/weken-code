
const defaultState = {
    auth: false,
    data: [],
    horses: null,
    editHorse: null,
    edit: false
}

const reducer = (state = defaultState, action) => {
    const { type, data } = action;
    switch (type) {
        case "USER_AUTHENTICATED": return {
            ...state,
            auth: true,
            data: data
        };
        case "USER_UN_AUTHORISED": return {
            ...state,
            auth: false,
            data: [],
            horses: []
        }
        case "SET_HORSES_DATA":
            return {
                ...state,
                horses: data
            }
        case "DELETE_HORSE_BY_ID":
            const copyHorses = state.horses.filter(horse => horse.id !== action.id);
            return {
                ...state,
                horses: copyHorses
            }
        case "EDIT_HORSE":
            return {
                ...state,
                editHorse: action.horse,
                edit: true
            }
        case "RESET_EDIT_DATA":
            return {
                ...state,
                editHorse: null,
                edit: false
            }
        default: return state;
    }
};

export default reducer;
