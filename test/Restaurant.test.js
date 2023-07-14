import Restaurant from "../model/Restaurant.js";

describe("Restaurant getNameAndAddress", () => {
    it("should return the correct name and address", async () => {
      const restaurant = new Restaurant({
        name: "Kerwin's Donuts",
        address: "taft avenue",
      });
      expect(restaurant.getRestaurantNameAndAddress()).toBe(
        "Kerwin's Donuts - taft avenue"
      );
    });
  });

  describe("Restaurant getNumberOfReviewsInWords", () => {
    it("should return the correct word", async () => {
      const restaurant = new Restaurant({
        name: "Kerwin's Donuts",
        address: "taft avenue",
        numberOfReviews: 1,
      });
      expect(restaurant.getNumberOfReviewsInWords()==="One").toBeTruthy();
    });
  });
    