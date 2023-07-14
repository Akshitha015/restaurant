import mongoose from "mongoose";
const { Schema, model } = mongoose;

const restaurantSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  numberOfEmployees: Number,
  numberOfReviews: Number,
});

restaurantSchema.methods.getRestaurantNameAndAddress = function () {
  return `${this.name} - ${this.address}`;
};

restaurantSchema.methods.getNumberOfReviewsInWords = function () {
  if (this.numberOfReviews === 1) return "One";
  if (this.numberOfReviews === 2) return "Two";
  if (this.numberOfReviews === 3) return "Three";
  if (this.numberOfReviews === 4) return "Four";
};

const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;
