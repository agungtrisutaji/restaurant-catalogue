import {
  listRetaurantReview,
  customerReviewForm,
} from '../../templates/template-creator';

class ReviewRestaurantView {
  getTemplate() {
    return `
    <div id="restaurant" class="restaurant"></div>
    <div id="likeButtonContainer"></div>
    <div class="restaurantReviews">
    <h3>Customer Reviews &#10025;</h3>
    <ul id="customerReviews">
    
    </ul>
    <div id="addReviewFormContainer" class="review-form"></div>
    </div>
    `;
  }

  showAddReviewForm() {
    return customerReviewForm();
  }

  showCustomerReviews(reviews) {
    let review;
    if (reviews.length) {
      review = reviews.reduce(
        (carry, restaurant) => carry.concat(listRetaurantReview(restaurant)),
        ''
      );
    } else {
      review = this._getEmptyReviewTemplate();
    }

    document.getElementById('customerReviews').innerHTML = review;
  }

  _getEmptyReviewTemplate() {
    return `
      <div class="review-item__not__found">
        Tidak ada review untuk ditampilkan
      </div>
    `;
  }

  resetAddReviewForm() {
    document.getElementById('addReviewForm').reset();
  }
}

export default ReviewRestaurantView;
