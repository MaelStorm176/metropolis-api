import { getMovie } from "../index.js";

//get argv
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: node test/get_one_movie.js <id>');
    process.exit(1);
}

const id = args[0];

const movie = await getMovie(id);
console.log(movie);