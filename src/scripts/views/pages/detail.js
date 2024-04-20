import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { renderRestaurantDetail } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
    <div id="restaurant" class="restaurant"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    console.log(url);
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = renderRestaurantDetail(restaurant);
  },
};

export default Detail;
