import thunk from 'redux-thunk';
import rootReducer from './Reducers'; // Replace with your actual rootReducer
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({reducer:rootReducer,middleware:[thunk]});
