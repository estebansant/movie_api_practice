// Data
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

function likedMoviesList (){
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movie;

    if(item){
        movie = item;
    } else{
        movie = {}
    }

    return movie;
};

function likeMovieEvent(movie) {
    // movie.id
    const likedMovies = likedMoviesList();
    console.log(likedMovies);

    // removing movie from favorites
    if(likedMovies[movie.id]){
        likedMovies[movie.id] = undefined;
    } else {
        // adding movie to favorites
        likedMovies[movie.id] = movie;
    };

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
};

// Utils
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            const url = entry.target.getAttribute('data-src');
            entry.target.setAttribute('src', url);
        };
    });
});

function displayMovies (movies, container, { lazyLoad = false, clean = true }={}) {

    if (clean) {
        container.innerHTML = "";
    };

    movies.forEach(item => {        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie__container');

        // Add content to movie card
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie__container--img');
        movieImg.setAttribute('alt', item.title);
        movieImg.setAttribute(
        lazyLoad ? 'data-src': 'src', 
        `https://image.tmdb.org/t/p/w300${item.poster_path}`
        );

        // Enter movie
        movieImg.addEventListener('click', () => {
            location.hash = "movie=" + item.id;
        });

        // Display error image
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', './src/images/robot_error.png');
            movieImg.setAttribute('alt', 'error-image-notfound');
          });

        // Like button
        const likeButton = document.createElement('button');
        likeButton.classList.add('like__button');
        likedMoviesList()[item.id] && likeButton.classList.add('like__button--on');
        likeButton.addEventListener('click', () =>{
            likeButton.classList.toggle('like__button--on');
            likeMovieEvent(item);
            getLikedMovies();
        });

        if(lazyLoad){
            lazyLoader.observe(movieImg);
        };

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(likeButton);
        container.appendChild(movieContainer);
    });
};

function displayGenres (genres, container) {
    container.innerHTML = "";

    genres.forEach(item => {        
        const genresContainer = document.createElement('div');
        genresContainer.classList.add('category__container');

        const genresTitle = document.createElement('h3');
        genresTitle.classList.add('category__title');

        genresTitle.addEventListener('click', () => {
            location.hash = `#category=${item.id}-${item.name}`;
        });

        genresTitle.setAttribute('id', `id${item.id}`);
        const genresTitleText = document.createTextNode(item.name);

        genresTitle.appendChild(genresTitleText);
        genresContainer.appendChild(genresTitle);
        container.appendChild(genresContainer);
    });
};

// API calls

async function getTrendingMoviesPreview() {
    const { data } = await api ('/trending/movie/day');
    const movies = data.results;

    // Movies preview
    displayMovies(movies, mainMoviesContainer, {lazyLoad:true});
};

async function getCategoriesPreview() {
    const {data} = await api ('/genre/movie/list');
    const categories = data.genres;

    // Genres preview
    displayGenres(categories, mainGenresContainer);    
};

async function getMoviesByCategory(id) {
    const { data } = await api ('/discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;

    // Display movies on each category
    displayMovies(movies, genericSection, {lazyLoad:true});
};

function loadPaginatedMoviesByCategory(id) {
    return async function () {
        const {
            scrollTop,
            clientHeight,
            scrollHeight
        } = document.documentElement;
    
        const pageIsNotMax = page < maxPage;
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 20);
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const {data} = await api ('/discover/movie',{
                params: {
                    with_genres: id,
                    page,
                }
            });
            const movies = data.results;
        
            displayMovies(movies, genericSection, {lazyLoad: true, clean: false});
        };
    }    
};

async function getMoviesBySearch(query) {
    const { data } = await api ('/search/movie', {
        params: {
            query: query,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;

    // Display movies on each category
    displayMovies(movies, genericSection, {lazyLoad:true});
};

function loadPaginatedSearchedMovies(query) {
    return async function () {
        const {
            scrollTop,
            clientHeight,
            scrollHeight
        } = document.documentElement;
    
        const pageIsNotMax = page < maxPage;
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 20);
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const {data} = await api ('/search/movie',{
                params: {
                    query: query,
                    page,
                }
            });
            const movies = data.results;
        
            displayMovies(movies, genericSection, {lazyLoad: true, clean: false});
        };
    }    
};

async function getFullTrendingMovies() {
    const { data } = await api ('/trending/movie/day');
    const movies = data.results;
    maxPage = data.total_pages;

    displayMovies(movies, genericSection, {lazyLoad: true, clean: true});
};

async function loadPaginatedTrendingMovies() {
    const {
        scrollTop,
        clientHeight,
        scrollHeight
    } = document.documentElement;

    const pageIsNotMax = page < maxPage;
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 20);

    if (scrollIsBottom && pageIsNotMax) {
        page++;
        const {data} = await api ('/trending/movie/day',{
            params: {
                page,
            }
        });
        const movies = data.results;
    
        displayMovies(movies, genericSection, {lazyLoad: true, clean: false});
    };
};

async function getMovieInfo(id){
    const { data } = await api ('/movie/' + id);
    const movie = data;

    const posterImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    headerSection.style.background = `
        linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
        url(${posterImgUrl})
    `;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    displayGenres(movie.genres, movieDetailGenresList);
    getRelatedMovies (id);
};

async function getRelatedMovies (id){
    const { data } = await api (`/movie/${id}/recommendations`);
    const relatedMovies = data.results;

    displayMovies(relatedMovies, relatedMoviesContainer, {lazyLoad:true});
};

function getLikedMovies () {
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);

    displayMovies(moviesArray, likedMoviesContainer, {lazyLoad:true, clean: true});
}