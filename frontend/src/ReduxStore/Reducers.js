const initialState = {
    users: [],
    domain:[],
    gender:[],
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USERS_REQUEST':
        return { ...state, loading: true, error: null };
  
      case 'FETCH_USERS_SUCCESS':
        return { ...state, loading: false, users: action.payload, error: null };
  
      case 'FETCH_USERS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'FETCH_UNIQUE_REQUEST':
        return { ...state, loading: true, error: null };
  
      case 'FETCH_UNIQUE_SUCCESS':
        return { ...state, loading: false, domain: action.payload.data.domainValues,gender:action.payload.data.genderValues, error: null };
  
      case 'FETCH_UNIQUE_FAILURE':
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default userReducer;