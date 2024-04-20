import RestaurantSource from '../../data/restaurant-source';
import { restaurantItem } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="content">
      <h2 class="content__heading">Now Playing in Cinema</h2>
      <div id="restaurants" class="row">
      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.home();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += restaurantItem(restaurant);
    });
  },
};

export default Home;
