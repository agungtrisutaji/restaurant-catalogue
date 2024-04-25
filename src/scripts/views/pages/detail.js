import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { renderRestaurantDetail } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
    <div id="restaurant" class="restaurant"></div>
    <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    console.log(url);
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = renderRestaurantDetail(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
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

    const addReviewForm = document.getElementById('addReviewForm');
    addReviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const reviewerName = document.getElementById('reviewerName').value;
      const reviewContent = document.getElementById('reviewContent').value;
      const reviewData = {
        id: restaurant.id,
        name: reviewerName,
        review: reviewContent,
      };
      try {
        const response = await RestaurantSource.addReview(reviewData);
        console.log('Review added:', response);
        window.location.reload();
      } catch (error) {
        console.error('Failed to add review:', error);
      }
    });
  },
};

export default Detail;
