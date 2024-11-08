const requestURL = "https://dragonball-api.com/api/planets?page=1&limit=20";

async function fetchPlanets() {
  try {
    const response = await fetch(requestURL);

    if (!response.ok) {
      throw new Error(
        `An error ocurred. API request failed ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`An error ocurred. Null JSON ${error}`);
    return null;
  }
}

function createPlanetCard(data) {
  console.log(data);
  let desc = data.description.substring(0, 100);
  return `
        <div class="card" style="width: 18rem;">
            <img src="${data.image}" class="card-img-top" id="imgPlanet" alt="${
    data.name
  }">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    ${data.isDestroyed ? "Destruido" : "No destruido"}
                </li>
                <li class="list-group-item">
                    ${desc}...
                </li>
            </ul>
        </div>
    `;
}

async function displayPlanets() {
  const main = document.querySelector("main");
  const data = await fetchPlanets();

  if (data && data.items) {
    const planetsCard = data.items.map(createPlanetCard).join("");
    main.innerHTML = planetsCard;
  } else {
    main.innerHTML = `<p>No se pudo cargar el Json de los planetas de Dragon Ball.</p>`;
  }
}

displayPlanets();
