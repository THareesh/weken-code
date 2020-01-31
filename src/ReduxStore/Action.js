

export const authenticated = (data) => ({
    type: "USER_AUTHENTICATED",
    data
});

export const unAuthorised = () => ({
    type: "USER_UN_AUTHORISED"
});

export const setHorsesData = (data) => ({
    type: "SET_HORSES_DATA",
    data
});

export const deleteHorse = id => ({
    type: "DELETE_HORSE_BY_ID",
    id
});

export const editHorse = horse => ({
    type: "EDIT_HORSE",
    horse
});

export const resetEdit = () => ({
    type: "RESET_EDIT_DATA"
});