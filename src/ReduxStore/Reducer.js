
const defaultState = {
    auth: false,
    data: []
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
            data: []
        }
        default: return state;
    }
};

export default reducer;
