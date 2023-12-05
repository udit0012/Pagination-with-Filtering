export const fetchUsersRequest = () => ({
    type: 'FETCH_USERS_REQUEST',
});

export const fetchUsersSuccess = (users) => ({
    type: 'FETCH_USERS_SUCCESS',
    payload: users,
});

export const fetchUsersFailure = (error) => ({
    type: 'FETCH_USERS_FAILURE',
    payload: error,
});

export const fetchUsers = (pageNumber,filters) => async (dispatch) => {
    try {
        dispatch(fetchUsersRequest());
        const queryParams = new URLSearchParams({
            page:pageNumber,
            filters:JSON.stringify(filters)
        })
        // Replace the API endpoint with your actual backend endpoint
        const response = await fetch(`https://pagination-with-filtering-backend.onrender.com/api/users?${queryParams.toString()}`);
        const data = await response.json();

        dispatch(fetchUsersSuccess(data));
    } catch (error) {
        dispatch(fetchUsersFailure(error.message));
    }
};

export const fetchValuesRequest = () => ({
    type: 'FETCH_UNIQUE_REQUEST',
});

export const fetchValuesSuccess = (users) => ({
    type: 'FETCH_UNIQUE_SUCCESS',
    payload: users,
});

export const fetchValuesFailure = (error) => ({
    type: 'FETCH_UNIQUE_FAILURE',
    payload: error,
});

export const fetchValues = () => async (dispatch) => {
    try {
        dispatch(fetchValuesRequest());

        // Replace the API endpoint with your actual backend endpoint
        const response = await fetch(`https://pagination-with-filtering-backend.onrender.com/api/uniqueValues`);
        const data = await response.json();
        console.log(data);
        dispatch(fetchValuesSuccess(data));
    } catch (error) {
        dispatch(fetchValuesFailure(error.message));
    }
};