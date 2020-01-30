

export const authenticated = ( data) => ({
    type: "USER_AUTHENTICATED",
    data
});

export const unAuthorised = () => ({
    type: "USER_UN_AUTHORISED"
});