import { spyOn } from 'jest-mock';
import ReviewRestaurantAddPresenter from '../src/scripts/views/pages/review-restaurant/review-restaurant-add-presenter';
import RestaurantSource from '../src/scripts/data/restaurant-source';

describe('Add restaurant review', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="restaurant" class="restaurant"></div>
    <div id="likeButtonContainer"></div>
    <div class="restaurantReviews">
    <h3>Customer Reviews &#10025;</h3>
    <ul id="customerReviews">
    
    </ul>
    <div id="addReviewForm" class="review-form">
    <h3>Add Review</h3>
    <form id="addReviewForm">
      <div class="form-group">
        <label for="reviewerName">Your Name:</label>
        <input type="text" id="reviewerName" name="reviewerName" required>
      </div>
      <div class="form-group">
        <label for="reviewContent">Your Review:</label>
        <textarea id="reviewContent" name="reviewContent" required></textarea>
      </div>
      <button type="submit">Submit Review</button>
    </form></div>
    </div>
    `;
  });

  it('should ask the model to add review for restaurant', () => {
    const addReviewSpy = jest
      .spyOn(RestaurantSource, 'addReview')
      .mockResolvedValue('Review added');
    const restaurant = { id: 'rqdv5juczeskfw1e867' };
    const presenter = new ReviewRestaurantAddPresenter({
      view: null,
      restaurant,
      restaurantSource: RestaurantSource,
    });

    const reviewerName = document.querySelector('#reviewerName');
    reviewerName.value = 'John Doe';
    const reviewContent = document.querySelector('#reviewContent');
    reviewContent.value = 'resto a';

    const addReviewForm = document.querySelector('#addReviewForm');
    const submitEvent = new Event('submit');
    addReviewForm.dispatchEvent(submitEvent);

    expect(addReviewSpy).toHaveBeenCalledWith({
      id: restaurant.id,
      name: 'John Doe',
      review: 'resto a',
    });
  });
});
