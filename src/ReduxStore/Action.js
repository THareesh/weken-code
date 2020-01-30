

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
})