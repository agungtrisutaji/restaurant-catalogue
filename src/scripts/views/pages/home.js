import RestaurantSource from "../../data/restaurant-source";
import { restaurantItem } from "../templates/template-creator";

const Home = {
  async render() {
    return `
    <div class="container">
      <h2 class="content__heading">Handpicked Dining Destinations</h2>
      <div class="loader_wrapper">
        <div class="loader"></div>
      </div>
      <div id="restaurants" class="row restaurants"></div>
    </div>
    `;
  },

  async afterRender() {
    const loadingElement = document.querySelector(".loader_wrapper");
    const restaurantsContainer = document.querySelector("#restaurants");

    const restaurants = await RestaurantSource.listRetaurant();
    loadingElement.classList.add("display_none");

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += restaurantItem(restaurant);
    });
  },
};

export default Home;
