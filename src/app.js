import { handleHomePage } from "./handlers.js";

export const handleRequest = async (request) => {
  const path = new URL(request.url).pathname;
  console.log(path);
  // if (path === "/") {
  //   return await handleHomePage();
  // }
  if (path.startsWith("./css/")) {
    return new Response(await Deno.readTextFile(path));
  }
  let pageNumber = Number(path.match(/\d+/));
  pageNumber = pageNumber <= 0 ? 1 : pageNumber;
  return await handleHomePage(pageNumber);
};
