import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/root-reducer';

const initialState = {};

const middleWare = [ReduxThunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;