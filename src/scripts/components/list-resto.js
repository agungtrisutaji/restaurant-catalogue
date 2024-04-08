class ListResto extends HTMLElement {
  connectedCallback() {
    this.renderLoading()
    this.fetchListResto()
  }

  async fetchListResto() {
    try {
      const response = await fetch('https://restaurant-api.dicoding.dev/list')
      const data = await response.json()
      console.log(data)
      const listResto = data.restaurants
      listResto.forEach((restaurant) => {
        this.renderListResto(restaurant)
      })
      this.removeLoading()
    } catch (error) {
      console.error('Error fetching list resto:', error)
      this.renderError('Failed to fetch list resto.')
    }
  }

  renderLoading() {
    this.innerHTML = `<h2>Loading...</h2>`
  }

  removeLoading() {
    const loadingElement = this.querySelector('h2')
    if (loadingElement) {
      loadingElement.remove()
    }
  }

  renderListResto(restaurant) {
    const truncatedDescription =
      restaurant.description.length > 100
        ? `${restaurant.description.substring(0, 100)}...`
        : restaurant.description

    const restoCard = document.createElement('div')
    restoCard.classList.add('col')
    restoCard.innerHTML = `
      <div class="card mx-auto mt-4" style="width: 18rem;">
        <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" class="card-img-top" alt="${restaurant.name} thumbnail">
        <div class="card-body">
          <h5 class="card-title">${restaurant.name}</h5>
          <p class="card-text">${truncatedDescription}</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">City: ${restaurant.city}</li>
            <li class="list-group-item">Rating: ${restaurant.rating}</li>
          </ul>
        </div>
      </div>
    `
    this.appendChild(restoCard)
  }

  renderError(message) {
    this.innerHTML = `<h2 class="placeholder">${message}</h2>`
  }
}

customElements.define('list-resto', ListResto)
