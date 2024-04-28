Feature('Liking Restaurants');
const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/#/favourite');
});
Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#queryTitle');
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.seeElement('.restaurant__link a');
  const firstRestaurant = locate('.restaurant__title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  const firstRestaurantLink = locate('.restaurant__link a').first();
  I.click(firstRestaurantLink);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.amOnPage('/#/favourite');
  I.seeElement('.restaurants__item');
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__link a');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__link a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.restaurant__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favourite');
  I.seeElement('#queryTitle');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(
    '.restaurants__item'
  );
  assert.strictEqual(titles.length, visibleLikedRestaurants);

  const searchQuery = titles[1].substring(1, 3);
  I.fillField('#queryTitle', searchQuery);
  I.pressKey('Enter');
  // mendapatkan daftar film yang sesuai dengan searchQuery
  const matchingRestaurants = titles.filter(
    (title) => title.indexOf(searchQuery) !== -1
  );
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements(
    '.restaurants__item'
  );
  assert.strictEqual(
    matchingRestaurants.length,
    visibleSearchedLikedRestaurants
  );
  for (let i = 0; i < matchingRestaurants.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleTitle = await I.grabTextFrom(
      locate('.restaurant__title').at(i + 1)
    );
    assert.strictEqual(matchingRestaurants[i], visibleTitle);
  }
});
