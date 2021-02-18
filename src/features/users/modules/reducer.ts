import {Reducer} from 'redux';
import * as types from './types';
import {UsersActionTypes} from './actions';
import {IUserInfo} from "@api/index";

interface IUserState {
  allUsers: Array<IUserInfo> | null,
  isFetching: boolean,
  currentPage: number,
  currentUsers: Array<IUserInfo> | null,
  searchedUsers: Array<IUserInfo> | null,
  userInfo: IUserInfo | null
}

const initialState : IUserState = {
  allUsers: null,
  isFetching: false,
  currentPage: 0,
  currentUsers: null,
  searchedUsers: null,
  userInfo: null
};

export const reducer: Reducer<IUserState, UsersActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_All_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case types.SET_IS_FETCHING:
      return {
        ...state,
       isFetching: action.payload,
      };
    case types.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case types.SET_CURRENT_USERS:
      return {
        ...state,
        currentUsers: action.payload,
      };
    case types.SET_SEARCHED_USERS:
      return {
        ...state,
        searchedUsers: action.payload,
      };
    case types.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case types.ADD_USER:
        return {
          ...state,
          allUsers: [action.payload, ...state.allUsers!]
        };
    default:
      return state;
  }
};
