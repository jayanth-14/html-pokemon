import { fetchPokemon, renderPokemons } from "./pokemon.js";
import { generateCardHtml, generateHomePage } from "./render.js";
const getPokemonUrls = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000000");
  const data = await res.json();
  const results = data.results;
  return results.map((result) => result.url);
};

const generatePokemonJson = async () => {
  const urls = await getPokemonUrls();
  const pokemons = await Promise.all(urls.map(fetchPokemon));
  const jsonFile = await Deno.open("./data/pokemons.json", {
    write: true,
    create: true,
    truncate: true,
  });
  await jsonFile.write(new TextEncoder().encode(JSON.stringify(pokemons)));
};

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

const createIndexHtml = async () => {
  await Deno.copyFile("./html/page1.html", "./html/index.html");
};

const generateStaticHtml = async (path = "../html/") => {
  let pageNumber = 0;
  const pokemonData = JSON.parse(
    await Deno.readTextFile("./data/pokemons.json"),
  );
  while (true) {
    try {
      const cards = generatePageCards(pageNumber, pokemonData);
      const html = generateHomePage(pageNumber, cards);
      const filePath = `./html/page${++pageNumber}.html`;
      await writeHtmlFile(filePath, html);
      console.log(`page ${pageNumber} done!`);
    } catch (error) {
      console.log(error.message);
      break;
    }
  }
  await createIndexHtml();
};

await generateStaticHtml();
