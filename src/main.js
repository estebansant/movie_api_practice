const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

async function getTrendingMoviesPreview() {
    const { data } = await api ('/trending/movie/day');

    const movies = data.results;
    movies.forEach(item => {        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie__container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie__container--img');
        movieImg.setAttribute('alt', item.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${item.poster_path}`);

        movieContainer.appendChild(movieImg);
        mainMoviesContainer.appendChild(movieContainer);
    })
}

async function getCategoriesPreview() {
    const {data} = await api ('/genre/movie/list');

    const categories = data.genres;
    categories.forEach(item => {        
        const genresContainer = document.createElement('div');
        genresContainer.classList.add('category__container');

        const genresTitle = document.createElement('h3');
        genresTitle.classList.add('category__title');
        genresTitle.setAttribute('id', `id${item.id}`)
        const genresTitleText = document.createTextNode(item.name);

        genresTitle.appendChild(genresTitleText);
        genresContainer.appendChild(genresTitle);
        mainGenresContainer.appendChild(genresContainer);
    })
}