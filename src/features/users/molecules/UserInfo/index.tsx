import {useSelector} from "react-redux";
import {RootState} from "@store/root-reducer";
import styles from './UserInfo.module.scss'
import React from "react";


export const UserInfo = React.forwardRef<HTMLDivElement>((props, ref) => {
const userInfo = useSelector((state:RootState)=> state.users.userInfo);
if(!userInfo) return null;

const {
  firstName,
  lastName,
  address: {
    streetAddress,
    city,
    state,
    zip
  },
  description } = userInfo;
  return  <div ref={ref} className={styles.wrapper}>
    <h3>Выбран пользователь:</h3>
    <p>{`${firstName} ${lastName}`}</p>
    <h3>Описание:</h3>
    <p>
     {description}
    </p>
    <h3>Адрес проживания:</h3>
    <p>{streetAddress}</p>
    <h3>Город:</h3> <p>{city}</p>
    <h3>Провинция/штат:</h3> <p>{state}</p>
    <h3>Индекс:</h3> <p>{zip}</p>
  </div>
});
