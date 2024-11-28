const API_BASE_URL = "http://localhost:3000"; // Update this URL if needed

// Fetch all restaurants and display them
function fetchRestaurants() {
  fetch(`${API_BASE_URL}/restaurant`)
    .then((response) => response.json())
    .then((restaurants) => {
      const restaurantList = document.getElementById("restaurants");
      restaurantList.innerHTML = restaurants
        .map(
          (restaurant) =>
            `<li>${restaurant.name} - ${restaurant.address}</li>`
        )
        .join("");
    })
    .catch((error) => console.error("Error fetching restaurants:", error));
}

// Add a new restaurant
document
  .getElementById("addRestaurantForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("restaurantName").value;
    const address = document.getElementById("restaurantAddress").value;

    fetch(`${API_BASE_URL}/restaurant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchRestaurants(); // Refresh the list
      })
      .catch((error) => console.error("Error adding restaurant:", error));
  });

// Search for restaurants by name
document.getElementById("searchButton").addEventListener("click", function () {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  fetch(`${API_BASE_URL}/search/${query}`)
    .then((response) => response.json())
    .then((restaurants) => {
      const restaurantList = document.getElementById("restaurantList");
      restaurantList.innerHTML = restaurants
        .map(
          (restaurant) =>
            `<li>${restaurant.name} - ${restaurant.address}</li>`
        )
        .join("");
    })
    .catch((error) => console.error("Error searching restaurants:", error));
});

// Initialize the app by fetching all restaurants
fetchRestaurants();
