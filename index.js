import * as cheerio from 'cheerio';

const firstUrl = "https://www.cinemet.fr/mobile/?p=";
const secondUrl = "https://www.cinemet.fr/";

const formatDuration = (duration) => {
    const durationSplit = duration.split("h");
    if (durationSplit.length === 2) {
        const hour = parseInt(durationSplit[0]);
        const minutes = parseInt(durationSplit[1]);
        return hour * 60 + minutes;
    }
    return undefined;
}

export const getMovies = async () => {
    const response = fetch(`${firstUrl}films-a-l-affiche`);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const movies = [];
    $('#affiche > ul > li').each((i, elem) => {
        const id = $(elem).find('a').attr('href').replace('https://www.cinemet.fr/mobile/?p=film&fid=', '');
        const title = $(elem).find('.titre').text();
        const duration = formatDuration($(elem).find('.duree').text());
        const genres = $(elem).find('.genre').text().split(', ')
        const poster = $(elem).find('.affiche').attr('src');
        const restriction = $(elem).find('.interdiction').text();
        const movie = {
            id,
            title,
            duration,
            genres,
            poster,
            restriction
        };
        movies.push(movie);
    });
    return movies;
}

export const getMovie = async (id) => {
    const response = await fetch(`${secondUrl}film/${id}`);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const title = $(".ff_titre").text();

    if (title === '') {
        throw new Error(`No movie found with id ${id}`);
    }

    const poster  = $("img.affiche").attr('src');
    const releaseDate = $(".ff_release > strong").text();
    const photos = $(".ff_pics > a > img").map((i, elem) => $(elem).attr('src')).get();
    const description = $(".ff_synopsis").text();
    const genre = $(".ff_genre > strong").text().split(', ').map((genre) => genre.trim());
    const duration = formatDuration($(".duration").text().replace('.',''));
    const director = $(".ff_director > strong").text().split(', ').map((director) => director.trim())
    const actors = $(".ff_cast > strong").text().split(', ').map((actor) => actor.trim())
    const restriction = $(".ff_tags > img").attr('alt');

    return {
        id,
        title,
        releaseDate,
        poster,
        photos,
        description,
        genre,
        duration,
        director,
        actors,
        restriction
    };
}


