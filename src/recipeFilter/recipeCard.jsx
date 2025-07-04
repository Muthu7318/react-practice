function RecipeCard({ recipe, addToCart }) {
  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "20px",
        height: "auto",
        margin: "15px auto",
        border: "2px solid lightgray",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        style={{
          width: "50%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "8px",
          width: "100%",
        }}
        src={recipe.image}
      ></img>
      <h3>{recipe.name}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <p
          style={{
            margin: 0,
          }}
        >
          🍽️Cuisine:{recipe.cuisine}
        </p>
        <p
          style={{
            margin: 0,
          }}
        >
          ⭐ Rating:{recipe.rating} ({recipe.reviewCount} reviews)
        </p>
      </div>
      <button
        style={{
          outline: "none",
          background: "Green",
          border: "none",
          color: "white",
          borderRadius: "5px",
          padding: "10px",
        }}
        onClick={addToCart}
      >
        Add to cart
      </button>
    </div>
  );
}

export default RecipeCard;
