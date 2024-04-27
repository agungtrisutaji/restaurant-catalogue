class ReviewRestaurantShowPresenter {
  constructor({ view, reviews }) {
    this._view = view;
    this._reviews = reviews;

    this._showCustomerReviews();
  }

  async _showCustomerReviews() {
    const customerReviews = await this._reviews;
    this._displayReviews(customerReviews);
  }

  _displayReviews(reviews) {
    this._view.showCustomerReviews(reviews);
  }
}

export default ReviewRestaurantShowPresenter;
