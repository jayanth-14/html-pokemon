import { fetchPokemon } from "./pokemon.js";

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

await generatePokemonJson();
