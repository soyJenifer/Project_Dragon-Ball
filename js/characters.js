const requestURL = "https://dragonball-api.com/api/characters?page=1&limit=58";

async function fetchCharacters() {
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

function createCharacterCard(data) {
  console.log(data);
  return `
        <div class="card" style="width: 17rem;">
            <img src="${data.image}" class="card-img-top" alt="${data.name}">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.race} - ${data.gender}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    Base KI:
                    <span>${
                      data.ki == "unknown" ? "Desconocido" : data.ki
                    }</span>
                </li>
                <li class="list-group-item">
                    Total KI:
                    <span>${
                      data.maxKi == "unknown" ? "Desconocido" : data.maxKi
                    }</span>
                </li>
                <li class="list-group-item">
                    Afiliación:
                    <span>${data.affiliation}</span>
                </li>
            </ul>
        </div>
    `;
}

async function displayCharacters() {
  const main = document.querySelector("main");
  const data = await fetchCharacters();

  if (data && data.items) {
    const charactersCard = data.items.map(createCharacterCard).join("");
    main.innerHTML = charactersCard;
  } else {
    main.innerHTML = `<p>No se pudo cargar el Json de los personajes de Dragon Ball.</p>`;
  }
}

displayCharacters();
