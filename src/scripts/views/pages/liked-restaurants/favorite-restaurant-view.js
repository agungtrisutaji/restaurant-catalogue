import { restaurantItem } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
    <div class="container">
    <input id="query" type="text">
    <h2 class="content__heading">Your Liked Restaurant</h2>
    <div id="restaurants" class="row">

    </div>
    </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.querySelector('#query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(restaurantItem(restaurant)),
        ''
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document
      .getElementById('restaurants')
      .dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
      Tidak ada restoran untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
