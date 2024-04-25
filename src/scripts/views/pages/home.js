import RestaurantSource from '../../data/restaurant-source';
import { restaurantItem } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="container">
      <h2 class="content__heading">Handpicked Dining Destinations</h2>
      <div id="restaurants" class="row restaurants">
      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRetaurant();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += restaurantItem(restaurant);
    });
  },
};

export default Home;
