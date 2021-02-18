import React, {FC, useEffect, useRef, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {usersActions} from "@users";
import {DispatchType, RootState} from "@store/root-reducer";
import {useParams} from "react-router-dom";
import styles from './UsersTable.module.scss'
import {IUserInfo} from "@api/index";
import {Paginator} from "@ui/organisms/Paginator";
import {UserInfo} from "@users/molecules/UserInfo";
import {AddUser} from "@users/molecules/AddUser";
import {Preloader} from "@ui/atoms/Preloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp
} from "@fortawesome/free-solid-svg-icons";


const phonePerformer = (str: string): number => {

  const phoneNumber = +str.replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/\-/g, "");

  return phoneNumber;
};

type SortType = 'id' | 'firstName' | 'phone' | 'lastName' | 'email';



const sort = (type: SortType, sortedBy: SortType, users: Array<IUserInfo>, setSortDirection: (isDownDirection?: true)=>void): Array<IUserInfo> | void => {
  let sortedUsers: Array<IUserInfo> | undefined;
  if (type === 'id') {
    if (sortedBy === 'id'){ setSortDirection(); return [...users].reverse();}
    setSortDirection(true);
    sortedUsers = [...users].sort((a, b) => a.id - b.id);
  }
  if (type === 'firstName') {
    if (sortedBy === 'firstName') { setSortDirection(); return [...users].reverse();}
    setSortDirection(true);
    sortedUsers = [...users].sort((a, b) => a.firstName.localeCompare(b.firstName));
  }
  if (type === 'lastName') {
    if (sortedBy === 'lastName') { setSortDirection();  return [...users].reverse();}
    setSortDirection(true);
    sortedUsers = [...users].sort((a, b) => a.lastName.localeCompare(b.lastName));
  }
  if (type === 'email') {
    if (sortedBy === 'email') { setSortDirection(); return [...users].reverse();}
    setSortDirection(true);
    sortedUsers = [...users].sort((a, b) => a.email.localeCompare(b.email));
  }
  if (type === 'phone') {
    if (sortedBy === 'phone') { setSortDirection(); return [...users].reverse();}
    setSortDirection(true);
    sortedUsers = [...users].sort((a, b) => phonePerformer(a.phone) - phonePerformer(b.phone));
  }
  if (sortedUsers) return sortedUsers;
};




export const UsersTable: FC = () => {
  const [sortedBy, setSortedBy] = useState<SortType>('id');
  const dispatch: DispatchType = useDispatch();
  const [pageLimit, setPageLimit] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null)
  const {pageNumber, type} = useParams() as { pageNumber: string, type: string };
  const [isModal, setIsModal] = useState(false);
  const [isSortedDown, setIsSortedDown] = useState(true)

  const {allUsers, currentUsers, currentPage, searchedUsers} = useSelector((state: RootState) => ({
    currentUsers: state.users.currentUsers,
    allUsers: state.users.allUsers,
    currentPage: state.users.currentPage,
    searchedUsers: state.users.searchedUsers,
  }), shallowEqual);


  useEffect(() => {
    async function fetchUsers() {
      if (type === 'big' && !allUsers) return dispatch(usersActions.getUsers(1000))
      if (type === 'small' && !allUsers) return dispatch(usersActions.getUsers(32))
    }

    fetchUsers().then(() => dispatch(usersActions.pagination(pageLimit, +pageNumber)))
  }, [pageNumber, pageLimit, searchedUsers, allUsers]);

  const onUserInfo = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement,
        userRow = target.closest(`.${styles.user}`) as HTMLElement;
    if (!userRow) return;
    const {id, name} = userRow.dataset;
    dispatch(usersActions.findUserAndSetInfo(+id!, name!)).then(() => ref.current!.scrollIntoView())

  };

  const usersRows = currentUsers?.map((item) => {
    return <tr className={styles.user} data-id={item.id}
        data-name={item.firstName} key={item.phone}>
      <td>{item.id}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
    </tr>
  });

  const setSortDirection = (down?: true) => {
    if(down) {
      setIsSortedDown(true)
    }else {
      setIsSortedDown((prevDirecrion)=> !prevDirecrion )
    }

};

  const onSort = (e: React.MouseEvent<HTMLTableElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const type = target.dataset.column as SortType;
    if (allUsers) {
      const sortedUsers = sort(type, sortedBy, allUsers,setSortDirection)

      if (sortedUsers) {
        dispatch(usersActions.setAllUsers(sortedUsers));
        dispatch(usersActions.pagination(pageLimit, currentPage));
        setSortedBy(type)
      }
    }
  };

  const onChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    return setPageLimit(+e.target.value);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery) {
      dispatch(usersActions.setSearchedUsers(null))
    } else {
      dispatch(usersActions.search(searchQuery))
    }
  };


  return <div className={styles.table_wrapper} onClick={onUserInfo}>
    {currentUsers && allUsers ?
        <>
          <input className={styles.addUser_button} type="button"
              onClick={() => setIsModal((prevIsModal) => !prevIsModal)}
              value={'Add' +
              ' User'}/>

          {isModal ?
              <AddUser closeModal={() => setIsModal(false)}/> : null}
          {isSortedDown ?
              <FontAwesomeIcon className={styles.sortArrow} icon={faAngleDoubleDown}/> :
              <FontAwesomeIcon className={styles.sortArrow} icon={faAngleDoubleUp}/>
          }


          <div className={styles.manage}>

            <form onSubmit={onSearch} className={styles.filter}>
              <input type="text" value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.textbox}
                  placeholder="Search"/>
              <input title="Search" value="Search" type="submit"
                  className={styles.button}/>
            </form>

            <input value="Reset" type="button" onClick={() => {
              dispatch(usersActions.setSearchedUsers(null));
              dispatch(usersActions.setUserInfo(null));
              setSearchQuery('')
            }}
                className={styles.button}/>
            <select className={styles.select} onChange={onChangeLimit}
                value={pageLimit}>
              <option value="" disabled={true}>Select a limit</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>

          </div>

          <table onClick={onSort} className={styles.users_table}>
            <tr>
              <th data-column={'id'}>id</th>
              <th data-column={'firstName'}>firstName</th>
              <th data-column={'lastName'}>LastName</th>
              <th data-column={'email'}>email</th>
              <th data-column={'phone'}>phone</th>
            </tr>
            <tbody>{usersRows}</tbody>
          </table>
          <Paginator currentPage={currentPage} pageLimit={pageLimit}
              totalCountUsers={searchedUsers?.length || allUsers.length}/>
          <UserInfo ref={ref}/>
        </>
        : <Preloader/>}
  </div>
}
