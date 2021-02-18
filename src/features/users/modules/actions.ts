import {Action} from 'redux';
import {ThunkType} from '@store/root-reducer';
import * as types from './types';
import {IUserInfo, rowsType, usersAPI} from "@api/index";

interface ISetAllUsersAction extends Action<typeof types.SET_All_USERS> {
  payload: Array<IUserInfo>
}

export const setAllUsers = (payload: Array<IUserInfo>): ISetAllUsersAction => ({
  type: types.SET_All_USERS,
  payload,

});

interface ISetCurrentUsersAction extends Action<typeof types.SET_CURRENT_USERS> {
  payload: Array<IUserInfo>
}

export const setCurrentUsers = (payload: Array<IUserInfo>): ISetCurrentUsersAction => ({
  type: types.SET_CURRENT_USERS,
  payload,

});

interface ISetSearchedUsersAction extends Action<typeof types.SET_SEARCHED_USERS> {
  payload: Array<IUserInfo> | null
}

export const setSearchedUsers = (payload: Array<IUserInfo> | null): ISetSearchedUsersAction => ({
  type: types.SET_SEARCHED_USERS,
  payload,
});


interface ISetIsFetchingAction extends Action<typeof types.SET_IS_FETCHING> {
  payload: boolean
}

export const setIsFetching = (payload: boolean): ISetIsFetchingAction => ({
  type: types.SET_IS_FETCHING,
  payload
})

interface ISetCurrentPageAction extends Action<typeof types.SET_CURRENT_PAGE> {
  payload: number
}

export const setCurrentPage = (payload: number): ISetCurrentPageAction => ({
  type: types.SET_CURRENT_PAGE,
  payload
});

interface ISetUserInfoAction extends Action<typeof types.SET_USER_INFO> {
  payload: IUserInfo | null
}

export const setUserInfo = (payload: IUserInfo | null): ISetUserInfoAction => ({
  type: types.SET_USER_INFO,
  payload
});

interface IAddUserAction extends Action<typeof types.ADD_USER> {
  payload: IUserInfo
}

export const addUser = (payload: IUserInfo): IAddUserAction => ({
  type: types.ADD_USER,
  payload
});


export const findUserAndSetInfo = (id: number, name: string): ThunkType<Promise<void>> => async (dispatch, getState) => {
  const allUsers = getState().users.allUsers;
  const findedUser = allUsers!.find((item) => {
    if (+item.id === id && item.firstName === name) return true;
    return false
  })

  dispatch(setUserInfo(findedUser!));
  console.log(findedUser)
};

export const pagination = (limit: number, pageNumber: number): ThunkType => (dispatch, getState) => {
  const allUsers = getState().users.allUsers;
  if (!allUsers) return;
  const searchedUsers = getState().users.searchedUsers;
  const offset = (pageNumber - 1) * limit;
  let currentUsers;
  if (searchedUsers) {
    currentUsers = searchedUsers.slice(offset, offset + limit);
  } else {
    currentUsers = allUsers.slice(offset, offset + limit);
  }
  dispatch(setCurrentUsers(currentUsers));
  dispatch(setCurrentPage(pageNumber))
};

export const search = (query: string,): ThunkType => (dispatch, getState) => {
  const searchQuery = query.toLowerCase()
  const allUsers = getState().users.allUsers;
  const filtredUsers = allUsers!.filter((item) => {
    return Object.values(item).some((value) => {

      if (value.toString().toLowerCase().indexOf(searchQuery) >= 0) return true;
      return false
    })
  })
  dispatch(setSearchedUsers(filtredUsers))
};

export const getUsers = (rows: rowsType): ThunkType => async (dispatch) => {
  dispatch(setIsFetching(true));
  const res = await usersAPI.getUsers(rows);
  if (!res) return;
  const sortedUsersById = [...res].sort((a, b) => a.id - b.id);
  dispatch(setAllUsers(sortedUsersById));
  dispatch(setIsFetching(false))
};

export type UsersActionTypes =
    ISetAllUsersAction
    | ISetIsFetchingAction
    | ISetCurrentPageAction
    | ISetCurrentUsersAction
    | ISetSearchedUsersAction
    | ISetUserInfoAction
    | IAddUserAction;
