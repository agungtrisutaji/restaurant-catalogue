import 'regenerator-runtime' /* for async await transpile */
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

fetch('./data/DATA.json')
  .then((response) => response.json())
  .then((data) => {
    const restaurants = data.restaurants

    const container = document.querySelector('.list-resto')

    const displayAllRestaurants = () => {
      container.innerHTML = ''

      restaurants.forEach((restaurant) => {
        appendRestaurantCard(restaurant)
      })
    }

    const displaySearchedRestaurants = (query) => {
      container.innerHTML = ''

      const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
      )

      filteredRestaurants.forEach((restaurant) => {
        appendRestaurantCard(restaurant)
      })
    }

    const appendRestaurantCard = (restaurant) => {
      const truncatedDescription =
        restaurant.description.length > 100
          ? `${restaurant.description.substring(0, 100)}...`
          : restaurant.description

      const card = `
      <div class="col">
        <div class="card mx-auto mt-4" style="width: 18rem;">
          <img src="${restaurant.pictureId}" class="card-img-top" alt="${restaurant.name} thumbnail">
          <div class="card-body">
            <h5 class="card-title">${restaurant.name}</h5>
            <p class="card-text">${truncatedDescription}</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">City: ${restaurant.city}</li>
              <li class="list-group-item">Rating: ${restaurant.rating}</li>
            </ul>
          </div>
        </div>
      </div>
      `
      container.innerHTML += card
    }

    const searchInput = document.querySelector('#search-input')

    searchInput.addEventListener('input', (event) => {
      const query = event.target.value

      if (query.trim() === '') {
        displayAllRestaurants()
      } else {
        displaySearchedRestaurants(query)
      }
    })

    displayAllRestaurants()
  })
  .catch((error) => console.error('Error fetching data:', error))
