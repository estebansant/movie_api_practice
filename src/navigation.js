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
}

function searchPage () {
    console.log('We are in Search!');
}

function moviePage () {
    console.log('We are in the Movie Details!');
}

function categoryPage () {
    console.log('We are in Categories!');
}

function homePage () {
    console.log('Home');
    getTrendingMoviesPreview();
    getCategoriesPreview();
}