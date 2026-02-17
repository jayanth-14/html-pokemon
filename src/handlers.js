import { renderPokemons } from "./pokemon.js";
import { generateHomePage } from "./render.js";

export const handleHomePage = async (pageNumber) => {
  const cards = await renderPokemons((pageNumber - 1) * 10, 10);
  const html = generateHomePage(pageNumber, cards);
  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
};
