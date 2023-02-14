let maxPage;
let page = 1;
let infiniteScroll;

searchFormButton.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

trendingButton.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowButton.addEventListener('click', () => {
    location.hash = window.history.back();
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);

function navigator () {
    console.log({location})

    if (infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    };

    if(location.hash.startsWith('#trends')){
        trendsPage();
    } else if (location.hash.startsWith('#search=')){
        searchPage();
    } else if (location.hash.startsWith('#movie=')){
        moviePage();
    } else if (location.hash.startsWith('#category=')){
        categoryPage();
    } else {
        homePage();
    };
    location.hash

    // Scrolling to top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Asigning infiniteScroll a value
    if(infiniteScroll){
        window.addEventListener('scroll', infiniteScroll, {passive: false});
    };
};

function trendsPage () {
    console.log('We are in Trends!');

    headerSection.classList.remove('header__container--long');
    headerSection.style.background='';
    arrowButton.classList.remove('inactive');
    arrowButton.classList.remove('header__arrow--white');
    headerTitle.classList.add('inactive');
    headerGenresTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genresPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerGenresTitle.innerText = 'Trending';

    getFullTrendingMovies();
    infiniteScroll = loadPaginatedTrendingMovies;
};

function searchPage () {
    console.log('We are in Search!');

    headerSection.classList.remove('header__container--long');
    headerSection.style.background='';
    arrowButton.classList.remove('inactive');
    arrowButton.classList.remove('header__arrow--white');
    headerTitle.classList.add('inactive');
    headerGenresTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genresPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // [#search, itemSearched]
    const [searchHash, query] = location.hash.split("=");
    getMoviesBySearch(query);

    infiniteScroll = loadPaginatedSearchedMovies(query);
};

function moviePage () {
    console.log('We are in the Movie Details!');

    headerSection.classList.add('header__container--long');
    arrowButton.classList.remove('inactive');
    arrowButton.classList.add('header__arrow--white');
    headerTitle.classList.add('inactive');
    headerGenresTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genresPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // [#movie, movieId]
    const [movieHash, movieId] = location.hash.split("=");
    getMovieInfo(movieId);
};

function categoryPage () {
    console.log('We are in Categories!');

    headerSection.classList.remove('header__container--long');
    headerSection.style.background='';
    arrowButton.classList.remove('inactive');
    arrowButton.classList.remove('header__arrow--white');
    headerTitle.classList.add('inactive');
    headerGenresTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genresPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // [#category, id-name]
    const [categoryHash, categoryInfo] = location.hash.split("=");
    // [id, name]
    const [categoryId, categoryName] = categoryInfo.split("-");
    const newCategoryName = decodeURI(categoryName);

    headerGenresTitle.innerText = newCategoryName;
    getMoviesByCategory(categoryId);

    infiniteScroll = loadPaginatedMoviesByCategory(categoryId);
};

function homePage () {
    console.log('Home');

    headerSection.classList.remove('header__container--long');
    headerSection.style.background='';
    arrowButton.classList.add('inactive');
    arrowButton.classList.remove('header__arrow--white');
    headerTitle.classList.remove('inactive');
    headerGenresTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    genresPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
    getLikedMovies();
};