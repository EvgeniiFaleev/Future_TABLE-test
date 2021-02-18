import {FC} from "react";
import styles from './Paginator.module.scss';
import {v4 as uuidv4} from 'uuid';
import {NavLink, useParams} from "react-router-dom";

interface IPaginatorProps {
  currentPage: number,
  totalCountUsers: number,
  pageLimit: number
}

const range = (from: number, to: number, totalPages: number, step = 1) => {
  let i = from;
  const range = [];
  if (i < 0){ to += 2; i = 1};
  if (i === 0) {
    to += 1;
    i = 1
  };

  while (i <= to && i <= totalPages) {

    range.push(i);
    i += step;
  }

  return range;
};

export const Paginator: FC<IPaginatorProps> = ({currentPage, totalCountUsers, pageLimit}) => {


  const totalPages = Math.ceil(totalCountUsers / pageLimit);
  const {type} = useParams() as { page: string, type: string };

  const items = range(currentPage - 2, currentPage + 2, totalPages);

  const paginatorNumbers = items.map((item) => {
    return <NavLink to={`/table/${type}/${item}`}
        activeClassName={styles.active}
        className={styles.paginator_item}
        data-pagenumber={item} key={uuidv4()}>{item}</NavLink>
  });

  return <nav className={styles.paginator}>
    {currentPage - 3 > 0 ?  <NavLink to={`/table/${type}/1`}>1</NavLink> : ''}
    {currentPage !== 1 ? <NavLink to={`/table/${type}/${currentPage - 1}`}>«</NavLink> : ''}
    {paginatorNumbers}
    {currentPage !== totalPages ? <NavLink to={`/table/${type}/${currentPage + 1}`}>»</NavLink> : ''}
    {currentPage + 3 <= totalPages ?     <NavLink
        to={`/table/${type}/${totalPages}`}>{totalPages}</NavLink> : ''}
  </nav>
}
