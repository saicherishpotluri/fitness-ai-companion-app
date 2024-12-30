import React, { useState } from "react";

function RecipeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [recipe, setRecipe] = useState(null);

  const createRecipe = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/create-recipe?item=${prompt}&ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestrictions=${dietaryRestrictions}`
      );
      const data = await response.text();
      parseRecipe(data);
    } catch (error) {
      console.error("Error generating recipe: ", error);
    }
  };

  const parseRecipe = (htmlString) => {
    // Parse HTML string into DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Extract data from the parsed HTML
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
    <div>
      <h2>Recipe Generator</h2>
      <label>What do you want to eat?</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter what do you want to eat"
      />
      <label>Ingredients</label>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (comma separated)"
      />
      <label>Cuisine</label>
      <input
        type="text"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        placeholder="Enter cuisine (comma separated)"
      />
      <label>DietaryRestrictions</label>
      <input
        type="text"
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        placeholder="Enter dietaryRestrictions (comma separated)"
      />
      <button onClick={createRecipe}>Create Recipe</button>
      <div className="output">
        {recipe ? (
          <div>
            <h3>
              <strong>{recipe.name}</strong>
            </h3>
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