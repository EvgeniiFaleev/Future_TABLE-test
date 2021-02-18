import {MainPage} from "@pages/MainPage";
import {TablePage} from "@pages/TablePage";


export const routes = () => [
  {
    path: '/',
    exact: true,
    component: MainPage,
  },
  {
    path: '/table/:type/:pageNumber?',
    exact: true,
    component: TablePage,
  },
  // { component: NotFoundPage },
];
