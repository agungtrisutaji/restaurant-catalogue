import CONFIG from '../../globals/config';

const createFoodMenu = (foods) => {
  const foodMenu = foods.map((food) => `<li>${food.name}</li>`).join('');
  return `<div class="restaurant__foods">
            <h3>Food Menu</h3>
            <ul>${foodMenu}</ul>
          </div>`;
};

const createDrinkMenu = (drinks) => {
  const drinkMenu = drinks.map((drink) => `<li>${drink.name}</li>`).join('');
  return `<div class="restaurant__drinks">
            <h3>Drink Menu</h3>
            <ul>${drinkMenu}</ul>
          </div>`;
};

const createCustomerReviews = (reviews) => {
  const customerReviews = reviews
    .map(
      (review) => `<li>${review.name}: ${review.review} (${review.date})</li>`
    )
    .join('');
  const reviewForm = `
  <div class="review-form">
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
  </form>
</div>
  `;
  return `<div class="restaurant__reviews">
            <h3>Customer Reviews &#10025;</h3>
            <ul>${customerReviews}</ul>
            ${reviewForm}
          </div>`;
};

const renderRestaurantDetail = (restaurant) => {
  const foodMenu = createFoodMenu(restaurant.menus.foods);
  const drinkMenu = createDrinkMenu(restaurant.menus.drinks);
  const customerReviews = createCustomerReviews(restaurant.customerReviews);

  return `<div class="restaurant">
            <h2 class="restaurant__title">${restaurant.name}</h2>
            <img class="restaurant__poster" src="${
              CONFIG.BASE_IMAGE_URL + restaurant.pictureId
            }" alt="${restaurant.name}" />
            <div class="restaurant__info">
              <h3>Information</h3>
              <ul>
                <li><h4>Address: ${restaurant.address}</h4></li>
                <li><h4>City: ${restaurant.city}</h4></li>
                <li><h4>Rating: ${restaurant.rating}⭐️</h4></li>
              </ul>
            </div>
            <div class="restaurant__overview">
              <h3>Overview</h3>
              <p>${restaurant.description}</p>
            </div>
            ${foodMenu}
            ${drinkMenu}
            </div>
            ${customerReviews}
          `;
};

const restaurantItem = (restaurant) => `
  <div class="col restaurants__item">
  <div class="card mx-auto mt-4" style="width: 18rem;">
  <img src="${
    CONFIG.BASE_IMAGE_URL + restaurant.pictureId
  }" class="card-img-top" alt="${
  restaurant.name
} thumbnail" crossorigin="anonymous">
  <div class="card-body">
    <h5 class="card-title">${restaurant.name}</h5>
    <p class="card-text fs-6">${restaurant.description}</p>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">City: ${restaurant.city}</li>
      <li class="list-group-item">Rating: ${restaurant.rating}⭐️</li>
    </ul>
    </div>
    <a href="/#/detail/${
      restaurant.id
    }" class="card-link text-center p-3">See Detail</a>
  </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  restaurantItem,
  renderRestaurantDetail,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createCustomerReviews,
};
