import RestaurantSource from '../../data/restaurant-source';

const Home = {
  async render() {
    return `
      <h2>Home Page</h2>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.home();
    console.log(restaurants);
  },
};

export default Home;
