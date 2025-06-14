const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const cocktailsDiv = document.getElementById("cocktails");
const groupList = document.getElementById("groupList");
const countSpan = document.getElementById("count");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

let group = [];

const showCocktails = (drinks) => {
  cocktailsDiv.innerHTML =
    drinks.length === 0 ? "<p>No cocktail found.</p>" : "";
  drinks.forEach((drink, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${drink.strDrinkThumb}" alt="${
      drink.strDrink
    }" style="width:100%; border-radius:8px; margin-bottom:10px;" />
      <h3>${drink.strDrink}</h3>
      <p><strong>Category:</strong> ${drink.strCategory}</p>
      <p>${drink.strInstructions.slice(0, 15)}...</p>
      <button onclick='addToGroup(${JSON.stringify(
        drink
      )})'>Add to Group</button>
      <button onclick='showDetails(${JSON.stringify(drink)})'>Details</button>
    `;
    cocktailsDiv.appendChild(card);
  });
};

const fetchCocktails = async (name = "a") => {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
  const data = await res.json();
  showCocktails(data.drinks || []);
};

const addToGroup = (drink) => {
  if (group.length >= 7) {
    alert("You can't add more than 7 drinks.");
    return;
  }
  if (!group.some((d) => d.strDrink === drink.strDrink)) {
    group.push(drink);

    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.marginBottom = "5px";
    li.innerHTML = `
      <span style="margin-right: 5px;">${group.length}.</span>
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="width:30px; height:30px; border-radius:50%; margin-right:10px;" />
      <span>${drink.strDrink}</span>
    `;

    groupList.appendChild(li);
    countSpan.textContent = group.length;
  }
};

const showDetails = (drink) => {
  modal.classList.remove("hidden");
  modalBody.innerHTML = `
    <h2>${drink.strDrink}</h2>
    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="width:100%; border-radius:8px; margin-bottom:10px;" />
    <p><strong>Category:</strong> ${drink.strCategory}</p>
    <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
    <p><strong>Glass:</strong> ${drink.strGlass}</p>
    <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
  `;
};

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  fetchCocktails(query);
});

window.addEventListener("load", () => fetchCocktails());
