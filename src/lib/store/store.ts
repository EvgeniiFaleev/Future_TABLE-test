import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from '@store/root-reducer';
import thunkMiddleWare from 'redux-thunk';

export const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

