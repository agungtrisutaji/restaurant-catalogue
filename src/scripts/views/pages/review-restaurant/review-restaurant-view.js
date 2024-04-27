import { listRetaurantReview } from '../../templates/template-creator';

class ReviewRestaurantView {
  getTemplate() {
    return `
    <div id="restaurant" class="restaurant"></div>
    <div id="likeButtonContainer"></div>
    <div class="restaurantReviews">
    <h3>Customer Reviews &#10025;</h3>
    <ul id="customerReviews">
    
    </ul>
    <div id="addReviewForm" class="review-form"></div>
    </div>
    `;
  }

  showCustomerReviews(reviews) {
    let review;
    if (reviews.length) {
      review = reviews.reduce(
        (carry, restaurant) => carry.concat(listRetaurantReview(restaurant)),
        ''
      );
    } else {
      review = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('customerReviews').innerHTML = review;
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div>
        Tidak ada film untuk ditampilkan
      </div>
    `;
  }

  resetAddReviewForm() {
    document.getElementById('addReviewForm').reset();
  }
}

export default ReviewRestaurantView;
