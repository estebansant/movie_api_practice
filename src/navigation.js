searchFormButton.addEventListener('click', () => {
    location.hash = '#search=';
});

trendingButton.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowButton.addEventListener('click', () => {
    location.hash = '#home';
})


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator () {
    console.log({location})
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
    }
    location.hash
}

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
    genresPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}

function searchPage () {
    console.log('We are in Search!');

    headerSection.classList.remove('header__container--long');
    headerSection.style.background='';
    arrowButton.classList.remove('inactive');
    arrowButton.classList.remove('header__arrow--white');
    headerTitle.classList.add('inactive');
    headerGenresTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.add('inactive');
    genresPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}

function moviePage () {
    console.log('We are in the Movie Details!');

    headerSection.classList.add('header__container--long');
    // headerSection.style.background='';
    arrowButton.classList.remove('inactive');
    arrowButton.classList.add('header__arrow--white');
    headerTitle.classList.add('inactive');
    headerGenresTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    genresPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}

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
    genresPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

}

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
    genresPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}