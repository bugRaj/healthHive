import { Paper } from "@mui/material";
import React, { useState } from "react";
import initialData from "./data";
import Dish from "./Dish";
import { Link } from "react-router-dom";
import "./singlerecipe.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/helper";

function Recipe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (user === null) {
      navigate("/login");
    }

    fetch(`${BASE_URL}/meal/findRecipe`, {
      method: "POST",
      body: JSON.stringify({ searchTerm }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1 className="test" style={{ textAlign: "center" }}>
        Recipes
      </h1>
      <form style={{ textAlign: "center" }} onSubmit={handleSearchSubmit}>
        <label htmlFor="search">
          <strong fontWeight="400px">Search for a recipe:</strong>
        </label>
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>

      <Paper
        sx={{
          margin: "20px 30px",
          padding: "40px 50px",
          border: "1px solid gray",
        }}
      >
        {data.results && data.results.length > 0 ? (
          data.results.map((dish) => (
            <Link to={`/recipe/${dish.id}`} key={dish.id}>
              <Dish title={dish.title} image={dish.image} id={dish.id}></Dish>
            </Link>
          ))
        ) : (
          <div>No results found.</div>
        )}
      </Paper>
    </div>
  );
}

export default Recipe;
