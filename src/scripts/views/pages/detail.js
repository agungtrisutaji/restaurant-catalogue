import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import {
  renderRestaurantDetail,
  customerReviewForm,
} from '../templates/template-creator';
import ReviewRestaurantView from './review-restaurant/review-restaurant-view';
import ReviewRestaurantShowPresenter from './review-restaurant/review-restaurant-show-presenter';
import ReviewRestaurantAddPresenter from './review-restaurant/review-restaurant-add-presenter';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const view = new ReviewRestaurantView();

const Detail = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const customerReviews = restaurant.customerReviews;
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = renderRestaurantDetail(restaurant);
    const addReviewForm = document.getElementById('addReviewForm');
    addReviewForm.innerHTML = customerReviewForm();

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        address: restaurant.address,
        rating: restaurant.rating,
      },
    });

    new ReviewRestaurantShowPresenter({
      view,
      reviews: customerReviews,
    });

    new ReviewRestaurantAddPresenter({
      view,
      restaurant: restaurant,
    });
  },
};

export default Detail;
