import Home from '../views/pages/home';
import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/': Home,
  '/home': Home,
  '/favourite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
