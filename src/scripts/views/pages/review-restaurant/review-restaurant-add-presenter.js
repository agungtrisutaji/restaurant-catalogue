class ReviewRestaurantAddPresenter {
  constructor({ view, restaurant, restaurantSource }) {
    this._view = view;
    this._restaurant = restaurant;
    this._restaurantSource = restaurantSource;

    this._handleSubmitAddReviewForm();
  }

  async _handleSubmitAddReviewForm() {
    const addReviewForm = document.getElementById('addReviewForm');
    addReviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const reviewerName = document.getElementById('reviewerName').value;
      const reviewContent = document.getElementById('reviewContent').value;
      const reviewData = {
        id: this._restaurant.id,
        name: reviewerName,
        review: reviewContent,
      };
      try {
        const response = await this._restaurantSource.addReview(reviewData);
        console.log('Review added:', response);
        this._clearForm();
      } catch (error) {
        console.error('Failed to add review:', error);
        this._showErrorMessage(error.message);
      }
    });
  }

  _showSuccessMessage() {
    alert('Review added successfully!');
  }

  _showErrorMessage(message) {
    alert(`Failed to add review: ${message}`);
  }

  _clearForm() {
    document.getElementById('reviewerName').value = '';
    document.getElementById('reviewContent').value = '';
  }
}

export default ReviewRestaurantAddPresenter;
