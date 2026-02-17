import { handleRequest } from "./src/app.js";

const main = () => {
  Deno.serve(handleRequest);
};

main();
