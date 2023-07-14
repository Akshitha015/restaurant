import Restaurant from "../model/Restaurant.js"

export const searchRestaurants = (parameter)=> {
    Restaurant.find({
        $or: [
        { name: { $regex: parameter, $options: "i" } },
        { address: { $regex: parameter, $options: "i" } },
        ],
    }).then((restaurants) => {
       return restaurants;
    });
}

export const createRestaurant = (name, address)=> {
    Restaurant.create({
        name: name,
        address: address
    }).then((restaurant) => {
       return restaurant;
    });
}