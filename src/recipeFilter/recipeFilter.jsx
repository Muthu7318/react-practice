import React, { useState } from "react";
import RecipeCard from "./recipeCard";

const recipesData = [
  {
    id: 1,
    name: "Classic Margherita Pizza",
    cuisine: "Italian",
    image: "https://cdn.dummyjson.com/recipe-images/1.webp",
    rating: 4.6,
    reviewCount: 98,
  },
  {
    id: 2,
    name: "Vegetarian Stir-Fry",
    cuisine: "Asian",
    image: "https://cdn.dummyjson.com/recipe-images/2.webp",
    rating: 4.7,
    reviewCount: 26,
  },
  {
    id: 3,
    name: "Chocolate Chip Cookies",
    cuisine: "American",
    image: "https://cdn.dummyjson.com/recipe-images/3.webp",
    rating: 4.9,
    reviewCount: 13,
  },
  {
    id: 4,
    name: "Chicken Alfredo Pasta",
    cuisine: "Italian",
    image: "https://cdn.dummyjson.com/recipe-images/4.webp",
    rating: 4.9,
    reviewCount: 82,
  },
  {
    id: 5,
    name: "Mango Salsa Chicken",
    cuisine: "Mexican",
    image: "https://cdn.dummyjson.com/recipe-images/5.webp",
    rating: 4.9,
    reviewCount: 63,
  },
  {
    id: 6,
    name: "Quinoa Salad with Avocado",
    cuisine: "Mediterranean",
    image: "https://cdn.dummyjson.com/recipe-images/6.webp",
    rating: 4.4,
    reviewCount: 59,
  },
  {
    id: 7,
    name: "Tomato Basil Bruschetta",
    cuisine: "Italian",
    image: "https://cdn.dummyjson.com/recipe-images/7.webp",
    rating: 4.7,
    reviewCount: 95,
  },
  {
    id: 8,
    name: "Beef and Broccoli Stir-Fry",
    cuisine: "Asian",
    image: "https://cdn.dummyjson.com/recipe-images/8.webp",
    rating: 4.7,
    reviewCount: 58,
  },
  {
    id: 9,
    name: "Caprese Salad",
    cuisine: "Italian",
    image: "https://cdn.dummyjson.com/recipe-images/9.webp",
    rating: 4.6,
    reviewCount: 82,
  },
  {
    id: 10,
    name: "Shrimp Scampi Pasta",
    cuisine: "Italian",
    image: "https://cdn.dummyjson.com/recipe-images/10.webp",
    rating: 4.3,
    reviewCount: 5,
  },
];

function RecipeFilter() {
  const [cartItems, setCartItems] = useState(0);
  const [avgRating, setAverageRating] = useState(0);

  const [recipe, setRecipe] = useState(recipesData);

  function handleFilterChange(e) {
    const updateRecipe = recipesData.filter(
      (item) => item.rating >= Number(e.target.value)
    );

    setRecipe(updateRecipe);

    let avg = 0;
    for (let recipe of updateRecipe) {
      avg = avg + recipe.rating;
    }
    avg = (avg / updateRecipe.length).toFixed(2);

    setAverageRating(avg);
  }

  function handleCartItem() {
    setCartItems((cartItem) => cartItem + 1);
  }

  return (
    <div
      style={{
        width: "auto",

        borderRadius: "10px",
        padding: "20px",
        height: "auto",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        🍽️ Recipe Explorer
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span>Filter by Rating</span>
          <select name="filters" id="filters" onChange={handleFilterChange}>
            <option value="4.0">4.0+</option>
            <option value="4.3">4.3+</option>
            <option value="4.4">4.4+</option>
            <option value="4.7">4.7+</option>
            <option value="4.9">4.9+</option>
          </select>
        </div>
        <div>Cart Items: {cartItems}</div>
      </div>
      <h3
        style={{
          textAlign: "center",
        }}
      >
        Average Rating: {avgRating}
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )",
          gap: "10px",
        }}
      >
        {recipe.map((item) => (
          <RecipeCard
            key={item.id}
            recipe={item}
            addToCart={handleCartItem}
          ></RecipeCard>
        ))}
      </div>
    </div>
  );
}

export default RecipeFilter;
