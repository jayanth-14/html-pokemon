import { fetchPokemon, renderPokemons } from "./pokemon.js";
import { generateCardHtml, generateHomePage } from "./render.js";

const writeHtmlFile = async (path, content) => {
  const htmlFile = await Deno.open(path, {
    write: true,
    create: true,
    truncate: true,
  });
  await htmlFile.write(new TextEncoder().encode(content));
};

const generatePageCards = (pageNumber, data) => {
  const offset = pageNumber * 10;
  const limit = 10;
  const pokemons = data.slice(offset, offset + limit);
  if (pokemons.length === 0) throw new Error("Reached the end");
  return pokemons.map(generateCardHtml).join("\n");
};

const createIndexHtml = async (path) => {
  await Deno.copyFile(`${path}/page1.html`, `${path}/index.html`);
};

const generateStaticHtml = async (path = "./docs") => {
  let pageNumber = 0;
  const pokemonData = JSON.parse(
    await Deno.readTextFile("./data/pokemons.json"),
  );
  while (true) {
    try {
      const cards = generatePageCards(pageNumber, pokemonData);
      const html = generateHomePage(pageNumber, cards);
      const filePath = `${path}/page${++pageNumber}.html`;
      await writeHtmlFile(filePath, html);
      console.log(`page ${pageNumber} done!`);
    } catch (error) {
      console.log(error.message);
      break;
    }
  }
  await createIndexHtml(path);
};

await generateStaticHtml();
