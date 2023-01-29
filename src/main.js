async function getTrendingMoviesPreview() {
    const res = await fetch (`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();

    const movies = data.results;
    movies.forEach(item => {
        const mainMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', item.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${item.poster_path}`);

        movieContainer.appendChild(movieImg);
        mainMoviesContainer.appendChild(movieContainer);

        console.log(mainMoviesContainer);
    })
}

async function getCategoriesPreview() {
    const res = await fetch (`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();

    const categories = data.genres;
    categories.forEach(item => {
        const mainGenresContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
        
        const genresContainer = document.createElement('div');
        genresContainer.classList.add('category-container');

        const genresTitle = document.createElement('h3');
        genresTitle.classList.add('category-title');
        genresTitle.setAttribute('id', `id${item.id}`)
        const genresTitleText = document.createTextNode(item.name);

        genresTitle.appendChild(genresTitleText);
        genresContainer.appendChild(genresTitle);
        mainGenresContainer.appendChild(genresContainer);

    })
}

getTrendingMoviesPreview();
getCategoriesPreview();