import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async listRetaurant() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async listReviews(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    const restaurant = responseJson.restaurant;
    return restaurant.customerReviews;
  }

  static async addReview(reviewData) {
    try {
      const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error('Failed to add review:', error);
      throw error;
    }
  }
}

export default RestaurantSource;
