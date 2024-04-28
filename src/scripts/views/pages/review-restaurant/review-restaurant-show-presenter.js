class ReviewRestaurantShowPresenter {
  constructor({ view, restaurant, restaurantSource }) {
    this._view = view;
    this._restaurant = restaurant;
    this._restaurantSource = restaurantSource;

    this._showCustomerReviews();
  }

  async _showCustomerReviews() {
    const customerReviews = await this._restaurantSource.listReviews(
      this._restaurant.id
    );
    this._displayReviews(customerReviews);
  }

  _displayReviews(reviews) {
    this._view.showCustomerReviews(reviews);
  }
}

export default ReviewRestaurantShowPresenter;
