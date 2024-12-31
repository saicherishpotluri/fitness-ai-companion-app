import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading spinner

  const createRecipe = async () => {
    setLoading(true); // Start loading spinner
    try {
      const response = await fetch(
        `http://localhost:8080/create-recipe?item=${prompt}&ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestrictions=${dietaryRestrictions}`
      );
      const data = await response.text();
      parseRecipe(data);
    } catch (error) {
      console.error("Error generating recipe: ", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const parseRecipe = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const recipeData = {
      name: doc.querySelector("h1")?.textContent || "",
      ingredients: Array.from(doc.querySelectorAll("ul:first-of-type li")).map(
        (li) => li.textContent
      ),
      instructions: Array.from(doc.querySelectorAll("ol li")).map(
        (li) => li.textContent
      ),
      nutritionalInfo: Array.from(
        doc.querySelectorAll("table tr:not(:first-child)")
      ).map((row) => {
        const cells = row.querySelectorAll("td");
        return `${cells[0]?.textContent}: ${cells[1]?.textContent}`;
      }),
      micronutrients: Array.from(
        doc.querySelectorAll("ul:nth-of-type(2) li")
      ).map((li) => li.textContent),
    };

    setRecipe(recipeData);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Personalized Meal Planner</h2>
      <form className="mb-4">
        <div className="row mb-3">
          <label htmlFor="prompt" className="col-sm-4 col-form-label">
            What do you want to eat?
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter what do you want to eat"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="ingredients" className="col-sm-4 col-form-label">
            Ingredients
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients (comma separated)"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="cuisine" className="col-sm-4 col-form-label">
            Cuisine
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="Enter cuisine (comma separated)"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="dietaryRestrictions" className="col-sm-4 col-form-label">
            Dietary Restrictions
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="dietaryRestrictions"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              placeholder="Enter dietary restrictions (comma separated)"
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={createRecipe}
        >
          Get Recipe
        </button>
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="output mt-4">
        {recipe ? (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>
                <strong>{recipe.name}</strong>
              </h3>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => {
                  const recipeText = `
                  Name: ${recipe.name}
                  Ingredients: ${recipe.ingredients.join(", ")}
                  Instructions: ${recipe.instructions.join("\n")}
                  Nutritional Information: ${recipe.nutritionalInfo.join(", ")}
                  Micronutrients and Notes: ${recipe.micronutrients.join(", ")}
                  `;
                  navigator.clipboard.writeText(recipeText).then(() => {
                    alert("Recipe copied to clipboard!");
                  });
                }}
              >
                <i className="fas fa-clipboard"></i> Copy
              </button>
            </div>
            <h4>Ingredients:</h4>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h4>Instructions:</h4>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
            <h4>Nutritional Information:</h4>
            <ul>
              {recipe.nutritionalInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
            <h4>Micronutrients and Notes:</h4>
            <ul>
              {recipe.micronutrients.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No recipe generated yet.</p>
        )}
      </div>
    </div>
  );
}

export default RecipeGenerator;
