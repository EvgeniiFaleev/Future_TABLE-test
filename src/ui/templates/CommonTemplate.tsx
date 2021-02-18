import {FC} from "react";
import styles from './CommonTemplate.module.scss'

export const CommonTemplate: FC = ({children}) => {

  return <div className={styles.wrapper}>
    {children}
  </div>
};
