import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  restaurantId: String,
  userId: String,
  userName: String,
  comment: String,
  numberOfStars: Number,
});

const Review = model("Review", reviewSchema);

export default Review;
