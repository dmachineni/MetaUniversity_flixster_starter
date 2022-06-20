const api_key = "92788f6ff82ab1a0ac35740e17eec490";
const imageBaseUrl = 'https://image.tmdb.org/t/p'
var movies;
// var query_string = "";
let page = 1;
let tmp_page = 1;
var original_movies;
var movie_list = [];
var searched = false;

 async function getData() {
    let response = await fetch (`https://api.themoviedb.org/3/movie/550?5api_key=${api_key}`);
    let data = await response.json();
    console.log(data);

 }

 function getData() {

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${page}`).then((response)=> {
                response.json().then((data)=>{
                    console.log(data.results);
                    movies = data.results;
                    movies.forEach((item)=>{
                        movie_list.push(item);
                        showMovie(item)
                    })
                }
            )
        }
    )
    
 }


const movieGridElement = document.querySelector('.movies-grid');
function showMovie(movie){
    const emoji = '#11088'
    movieGridElement.innerHTML = movieGridElement.innerHTML +`
        <div class = "movie-card">
            <p class = "movie-poster">
                <img alt="movie poster image" class="movie-poster" src="${imageBaseUrl}/w300${movie.poster_path}" 
            </p>

            <p class = "movie-votes" >
                &${emoji}
                ${movie.vote_average}/10
            </p>

            <p class = "movie-title"> 
                ${movie.title}
            </p>

            
        </div>`
}

//-----------------------------------
function getDataAfterSearch(query_string) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query_string}`).then((response)=> {
                response.json().then((data)=>{
                    console.log(data.results);
                    movies = data.results;
                    original_movies = movieGridElement.innerHTML;
                    movieGridElement.innerHTML = ``;

                    data.results.forEach((item)=>{
                        console.log(item.title)
                        showMovieAfterSearch(item)
                    })

                    movieGridElement.innerHTML = movieGridElement.innerHTML + `
                    <div>
                        <button id = "close-search-btn" type = "click" onclick = getDataAfterCloseSearch()>Close Search</button>
                    </div>
                    `
                }
            )
        }
    )
    
 }

 function showMovieAfterSearch(movie){
    const emoji = '#11088'
    movieGridElement.innerHTML = movieGridElement.innerHTML + `
        <div class = "movie-card">
            <p class = "movie-poster">
                <img alt="movie poster image" class="movie-poster" src="${imageBaseUrl}/w300${movie.poster_path}" 
            </p>
            <p class = "movie-votes" >
                &${emoji}
                ${movie.vote_average}/10
            </p>

            <p class = "movie-title"> 
                ${movie.title}
            </p>

            
        </div>`  
}

//-----------------------------

function getDataAfterCloseSearch() {
    // movieGridElement.innerHTML = original_movies;
    // tmp_page = page;
    // page = 1
    // for (let i = 1; i <= tmp_page; i++) { 
    //     getData();
    //     page = page + 1;
    // }
    movieGridElement.innerHTML = ``;
    movie_list.forEach((item)=>{
        showMovie(item)
    })
}

//-----------------------------

const loadMoreMoviesEl = document.querySelector('#load-more-movies-btn');
const searchInputEl = document.querySelector('#search-input');
const searchBar = document.querySelector("#search")
// console.log(searchInputEl)
const closeSearchEl = document.querySelector('#close-search-btn');

function addEventListeners (
    loadMoreMoviesButton,
    searchInputButton,
    closeSearchButton
) {
    loadMoreMoviesButton.addEventListener('click', ()=> {
        event.preventDefault();
        if (!searched) {
            page = page + 1;
            getData();
        } else {
            //create new function for get Data after searched for loading more movies
        }
    })

    searchInputButton.addEventListener('submit', ()=> {
        event.preventDefault();
        query_string = searchBar.value;
        // console.log(query_string)
        getDataAfterSearch(query_string);
    })
    console.log(closeSearchButton)
    // closeSearchButton.addEventListener('click', ()=>{
    //     event.preventDefault();
    //     movieGridElement.innerHTML = ``;
    //     getDataAfterCloseSearch();
    // })
}

 window.onload = ()=>{
    addEventListeners(loadMoreMoviesEl,searchInputEl,closeSearchEl);
    getData();
 }

