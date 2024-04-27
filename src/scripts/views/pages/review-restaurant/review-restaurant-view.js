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
    </div>
    `;
  }

  showCustomerReviews(reviews) {
    let html;
    if (reviews.length) {
      html = reviews.reduce(
        (carry, restaurant) => carry.concat(listRetaurantReview(restaurant)),
        ''
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('customerReviews').innerHTML = html;

    document
      .getElementById('customerReviews')
      .dispatchEvent(new Event('customerReviews:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada film untuk ditampilkan
      </div>
    `;
  }

  getAddReviewForm() {
    return {
      name: document.getElementById('reviewerName').value,
      review: document.getElementById('reviewContent').value,
    };
  }

  resetAddReviewForm() {
    document.getElementById('addReviewForm').reset();
  }
}

export default ReviewRestaurantView;
