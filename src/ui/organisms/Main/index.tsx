import {Link} from "react-router-dom";
import styles from "./Main.module.scss";

export const Main = () => {


  return<div  className={styles.links}>
    <p><Link to={'/table/small/1'}> Small Table</Link></p>
    <p><Link to={'/table/big/1'}> Big table</Link></p>
    </div>
};
