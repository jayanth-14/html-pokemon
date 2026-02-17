export const generateCardHtml = (pokemon) =>
  `<div class="card ${pokemon.types[0]}-card">
        <div class="card-image-container">
          <img
            src="${pokemon.url}"
              alt="an image of pokemon"
            class="card-image"
          />
          <div class="card-image-background"></div>
        </div>
        <div class="card-details">
          <h1 class="name">${pokemon.name}</h1>
          <div class="stats">
            <h1 class="stat"><span class="stat-name">Weight</span> ${pokemon.weight} hg</h1>
            <h1 class="stat"><span class="stat-name">Height</span> ${pokemon.height} dm</h1>
          </div>
          <h1 class="stat">
            <span class="stat-name">Type:</span>
            <ul>
              ${
    pokemon.types.map((type) =>
      `<li class="type-name ${type}-badge">${type}</li>`
    ).join(" ")
  }
            </ul>
          </h1>
        </div>
        <h2 class="card-id">${String(pokemon.id).padStart(3, "0")}</h2>
      </div>`;

const generateFooterHtml = (id) => {
  const current = Number(id);
  const previous = current - 1;
  const next = current + 1;
  return `    <footer>
      <section class="pagination">
        ${
    previous <= 0
      ? ""
      : `<a href="./page${previous}.html" class="pagination-button">previous</a>
      <a href="./page${previous}.html" class="pagination-button">${previous}</a>`
  }
        <a href="./page${current}.html" class="pagination-button active-pagination-button">${current}</a>
        <a href="./page${next}.html" class="pagination-button">${next}</a>
        <a href="./page${next}.html" class="pagination-button">next</a>
      </section>
    </footer>`;
};

const generateHomePageTemplate = () =>
  `<html>
  <head>
    <title>pokemon</title>
    <link rel="stylesheet" href="../css/index.css" />
    <link rel="stylesheet" href="../css/types.css" />
    <link rel="stylesheet" href="../css/footer.css" />
  </head>
  <body>
    <section class="navbar">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/960px-International_Pok%C3%A9mon_logo.svg.png"
        alt="pokemon logo"
        class="logo"
      />

      <div class="sub-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
          alt="pokeball image"
          id="pokeball-image"
        />
        <h2>Pokedex</h2>
      </div>
    </section>

    <main class="cards-container">
      {{cards}}
    </main>
    {{footer}}
  </body>
</html>
`;

export const generateHomePage = (id, cardsHtml) => {
  const template = generateHomePageTemplate();
  return template.replace("{{cards}}", cardsHtml).replace(
    "{{footer}}",
    generateFooterHtml(id + 1),
  );
  // return template;
};
