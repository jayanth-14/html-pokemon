import { generateCardHtml } from "./render.js";

const extractImageUrl = (data) => data.sprites.other.dream_world.front_default;

const extractTypes = (data) =>
  data.types.map((typeSlot) => typeSlot.type.name.trim());

const parsePokemonData = (data) => {
  return {
    id: data.id,
    name: data.name,
    weight: data.weight,
    height: data.height,
    url: extractImageUrl(data),
    types: extractTypes(data),
  };
};

export const fetchPokemon = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return parsePokemonData(data);
};

export const renderPokemons = async (offset = 0, limit = 20) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );
  const data = await res.json();
  const html = await Promise.all(
    data.results.map(async ({ url }) =>
      generateCardHtml(await fetchPokemon(url))
    ),
  );
  return html.join("\n");
};
