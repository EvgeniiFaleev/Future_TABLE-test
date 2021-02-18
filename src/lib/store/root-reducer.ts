import {Action, AnyAction, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {usersReducer} from "@users";


export const rootReducer = combineReducers({
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType,
RootState,
unknown, // extra arg
Action<string>>;

export type DispatchType = ThunkDispatch<RootState, void, AnyAction>;
