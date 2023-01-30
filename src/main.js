const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

// Utils
function displayMovies (movies, container) {
    container.innerHTML = "";

    movies.forEach(item => {        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie__container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie__container--img');
        movieImg.setAttribute('alt', item.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${item.poster_path}`);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function displayGenres (genres, container) {
    container.innerHTML = "";

    genres.forEach(item => {        
        const genresContainer = document.createElement('div');
        genresContainer.classList.add('category__container');

        const genresTitle = document.createElement('h3');
        genresTitle.classList.add('category__title');

        genresTitle.addEventListener('click', () => {
            location.hash = `#category=${item.id}-${item.name}`;
        })

        genresTitle.setAttribute('id', `id${item.id}`)
        const genresTitleText = document.createTextNode(item.name);

        genresTitle.appendChild(genresTitleText);
        genresContainer.appendChild(genresTitle);
        container.appendChild(genresContainer);
    });
}

// API calls

async function getTrendingMoviesPreview() {
    const { data } = await api ('/trending/movie/day');
    const movies = data.results;

    // Movies preview
    displayMovies(movies, mainMoviesContainer)
}

async function getCategoriesPreview() {
    const {data} = await api ('/genre/movie/list');
    const categories = data.genres;

    // Genres preview
    displayGenres(categories, mainGenresContainer);
    
}

async function getMoviesByCategory(id) {
    const { data } = await api ('/discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;

    // Display movies on each category
    displayMovies(movies, genericSection);
}