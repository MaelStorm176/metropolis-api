import { getMovies } from "../index.js";

const movies = await getMovies();
console.log(movies);