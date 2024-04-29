Feature("Adding Reviews");

Scenario("Post a review", async ({ I }) => {
  I.amOnPage("/");

  I.wait(2);

  I.seeElement(".restaurants");

  const firstRestaurantLink = locate(".restaurant__link a").first();

  I.click(firstRestaurantLink);

  I.wait(1);

  I.seeElement(".restaurantReviews");

  I.fillField("reviewerName", "Test e2e");
  I.fillField("reviewContent", "This is from e2e test");

  I.click("form button[type=submit]");

  I.wait(1);
});
