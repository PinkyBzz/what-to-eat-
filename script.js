const ingredientsListEl = document.getElementById("ingredientsList");
const searchInputEl = document.getElementById("searchInput");
const resultContainerEl = document.getElementById("resultContainer");
const resultImageEl = document.getElementById("resultImage");
const resultTextEl = document.getElementById("resultText");

// Placeholder images for allowed and not allowed states
const allowedImageSrc = "bagus.jpeg"; // Replace with user-provided image
const notAllowedImageSrc = "ga bagus.jpeg"; // Replace with user-provided image

const notAllowedIngredients = new Set([
  "Coffee",
  "Soda",
  "Orange juice",
  "Wine",
  "Beer",
  "Chocolate",
  "Spicy foods",
  "Garlic",
  "Onion",
  "Tomato",
  "Pepper",
  "Mint",
  "Mustard",
  "Vinegar",
  "Citrus fruits",
  "Fried foods",
  "Pastry",
  "Candy",
  "Ice cream",
  "Cookies",
  "Cake",
  "Chips",
  "Milkshake",
  "Butter",
  "Cream",
  "Cheese",
  "Chilli"
]);


function renderIngredientsList(filter = "") {
  ingredientsListEl.innerHTML = "";
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredIngredients.length === 0) {
    ingredientsListEl.innerHTML = "<li>No ingredients found.</li>";
    return;
  }

  filteredIngredients.forEach((ingredient) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.setAttribute("for", `ingredient-${ingredient}`);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `ingredient-${ingredient}`;
    checkbox.value = ingredient;
    checkbox.addEventListener("change", evaluateSelection);

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(ingredient));
    li.appendChild(label);
    ingredientsListEl.appendChild(li);
  });
}

// Evaluate the selected ingredients and update the result
function evaluateSelection() {
  const selectedIngredients = Array.from(
    ingredientsListEl.querySelectorAll("input[type=checkbox]:checked")
  ).map((checkbox) => checkbox.value);

  if (selectedIngredients.length === 0) {
    resultImageEl.src = "";
    resultImageEl.alt = "";
    resultTextEl.textContent = "Please select one or more ingredients.";
    return;
  }

  // Check if any selected ingredient is not allowed
  const isNotAllowed = selectedIngredients.some((ingredient) =>
    notAllowedIngredients.has(ingredient)
  );

  if (isNotAllowed) {
    resultImageEl.src = notAllowedImageSrc;
    resultImageEl.alt = "Not allowed for GERD acute";
    resultTextEl.textContent = "Tida bole Mam ini";
  } else {
    resultImageEl.src = allowedImageSrc;
    resultImageEl.alt = "Allowed for GERD acute";
    resultTextEl.textContent = "Bole mam ini";
  }
}

// Search input event listener
searchInputEl.addEventListener("input", (e) => {
  renderIngredientsList(e.target.value);
});

// Initial render
renderIngredientsList();
