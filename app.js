import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Restaurant from "./model/Restaurant.js";
import { connectToMongo } from "./db/conn.js";
import Review from "./model/Review.js";
import {
  createRestaurant,
  searchRestaurants,
} from "./controller/RestaurantController.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

connectToMongo(() => {
  console.log("Connected to MongoDB");
});

const routes = express.Router();

routes.route("/restaurant/:parameter").get(function (req, res) {
  Restaurant.findById(req.params.parameter).then((restaurant) => {
    Review.find({ restaurantId: req.params.parameter }).then((reviews) => {
      res.json({
        restaurant: restaurant,
        reviews: reviews,
      });
    });
  });
});

routes.route("/restaurant").get(function (req, res) {
  Restaurant.find().then((restaurants) => {
    res.json(restaurants);
  });
});

routes.route("/review").post(function (req, res) {
  const review = new Review({
    restaurantId: req.body.restaurantId,
    userId: req.body.userId,
    userName: req.body.userName,
    comment: req.body.comment,
    numberOfStars: req.body.numberOfStars,
  });
  review.save();
  res.json({ message: "Review saved" });
});

routes.route("/review/:id").get(function (req, res) {
  Review.findById(req.params.id).then((review) => {
    res.json(review);
  });
});

routes.route("/review/:id").patch(function (req, res) {
  Review.findById(req.params.id).then((review) => {
    review.restaurantId = req.body.restaurantId;
    review.userId = req.body.userId;
    review.userName = req.body.userName;
    review.comment = req.body.comment;
    review.numberOfStars = req.body.numberOfStars;
    review.save();
    res.json(review);
  });
});

routes.route("/restaurant").post(function (req, res) {
  createRestaurant(req.body.name, req.body.address);
  res.json({ message: "Restaurant saved" });
});

routes.route("/search/:parameter").get(function (req, res) {
  searchRestaurants(req.params.parameter).then((restaurants) => {
    res.json(restaurants);
  });
});

app.use(routes);

app.listen(3000, () => {
  console.log("App started");
  mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });
});
