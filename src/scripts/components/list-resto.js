const API_URL = 'https://restaurant-api.dicoding.dev';

class ListResto extends HTMLElement {
  connectedCallback() {
    this.renderLoading();
    this.fetchListResto();
  }

  async fetchListResto() {
    try {
      const listResto = await this.getListRestaurants();
      this.renderRestaurants(listResto);
      this.removeLoading();
    } catch (error) {
      this.renderError('Failed to fetch list resto.');
    }
  }

  async getListRestaurants() {
    const response = await fetch(`${API_URL}/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.restaurants;
  }

  renderLoading() {
    this.innerHTML = '<h2>Loading...</h2>';
  }

  removeLoading() {
    const loadingElement = this.querySelector('h2');
    if (loadingElement) {
      loadingElement.remove();
    }
  }

  renderRestaurants(restaurants) {
    restaurants.forEach((restaurant) => {
      const truncatedDescription = this.truncateDescription(
        restaurant.description
      );
      const restoCard = this.createRestaurantCard(
        restaurant,
        truncatedDescription
      );
      this.appendChild(restoCard);
    });
  }

  truncateDescription(description) {
    return description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;
  }

  createRestaurantCard(restaurant, truncatedDescription) {
    const restoCard = document.createElement('div');
    restoCard.classList.add('col');
    restoCard.innerHTML = `
      <div class="card mx-auto mt-4" style="width: 18rem;">
        <img src="${API_URL}/images/medium/${restaurant.pictureId}" class="card-img-top" alt="${restaurant.name} thumbnail">
        <div class="card-body">
          <h5 class="card-title">${restaurant.name}</h5>
          <p class="card-text">${truncatedDescription}</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">City: ${restaurant.city}</li>
            <li class="list-group-item">Rating: ${restaurant.rating}</li>
          </ul>
          </div>
          <a href="${API_URL}/detail/${restaurant.id}" class="card-link text-center py-1">See Detail</a>
      </div>
    `;
    return restoCard;
  }

  renderError(message) {
    this.innerHTML = `<h2 class="placeholder">${message}</h2>`;
  }
}

customElements.define('list-resto', ListResto);
