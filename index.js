import * as cheerio from 'cheerio';

const url = "https://www.cinemet.fr/mobile/?p=";

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
    const response = await fetch(`${url}films-a-l-affiche`);
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
    const response = await fetch(`${url}film&fid=${id}`);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const img = $(".affiche > a > img");
    const poster  = img.attr('src');
    const title = img.attr('alt');
    const photos = $(".photos > a > img").map((i, elem) => $(elem).attr('src')).get();
    const description = $(".synopsis").text();
    const genre = $(".genre").text();
    const duration = formatDuration($(".duree").text());
    const director = $(".real > strong").text().split(', ')
    const actors = $(".inter > strong").text().split(', ');
    const restriction = $(".interdiction").text();

    return {
        id,
        title,
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


