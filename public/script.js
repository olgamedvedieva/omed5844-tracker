const modal = document.querySelector("[data-modal]");
const openButton = document.querySelector(".hero-button");
const closeButton = document.querySelector(".close-modal-button");
const overlay = document.querySelector('.dialog-overlay');
openButton.addEventListener("click", () => {
  modal.showModal()
  overlay.classList.add('dialog-open')
  document.body.style.overflow = 'hidden';
});
closeButton.addEventListener("click", () => {
  modal.close()
  overlay.classList.remove('dialog-open');
  document.body.style.removeProperty('overflow');
});
const buttonTop=document.getElementById("top");
buttonTop.addEventListener("click",() => {
  window.scrollTo(0,0)
});
const form = document.getElementById("movieForm");
const ratingContainer = document.querySelector(".rating-container");

form.addEventListener('submit', function(event) {
  event.preventDefault();

    // Get the selected rating value
  const rating = document.querySelector('input[name="rating"]:checked').value;

    // Get form field values
  const movieName = form.elements.movieName.value;
  const subgenre = form.elements.subgenre.value;
  const releaseYear = form.elements.releaseYear.value;
  const platform = form.elements.platform.value;
  const director = form.elements.director.value;

    // Call the addMovie function with the form data
  addMovie(movieName, subgenre, releaseYear, platform, director, rating);

    // Reset form inputs
  form.reset();

    // Close modal if needed
  modal.close();
  });

  // Other code...

  // Function to add a movie to the list
  function addMovie(name, subgenre, releaseYear, platform, director, rating) {
    // Create a movie object
    const movie = {
      name,
      subgenre,
      releaseYear,
      id: Date.now(),
      date: new Date().toISOString(),
      platform,
      director,
      rating,
    };

    // Add the movie to the movieList array
    movieList.push(movie);

    // Do something with the movie data (e.g., update UI, send to server, etc.)
    console.log(movieList);
  }

  // Array to store movies
var movieList = [];

// Call the function with test values for the input paramaters

// Log the array to the console.
//console.log(movieList);
// Assuming you have captured the user input in a variable called userInput

// Replace spaces in the user input with '%20' to form a valid URL-encoded string
//const encodedInput = encodeURIComponent(movieName.value);

// Construct the API request URL with the encoded user input
//const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=1871ce5381b5ef8a5f45a43210139f5b&query=${encodedInput}`;

// Make the API request using fetch or any other HTTP library
//fetch(apiUrl)
  //.then(response => response.json())
  //.then(data => {
    // Extract movie details from the API response
   // const movies = data.results;
    
    // Assuming you want to select the first movie from the search results
   // const chosenMovie = movies[0];

    // Retrieve the movie ID
    //const movieId = chosenMovie.id;

    // Make a request to fetch movie details including the poster
   // const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1871ce5381b5ef8a5f45a43210139f5b`;

    //fetch(movieDetailsUrl)
      //.then(response => response.json())
      //.then(details => {
        // Extract the poster path from the movie details
        //const posterPath = details.poster_path;

        // Construct the poster URL using the retrieved poster path
       // const posterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

        // Display the movie poster in your web application
        //const imgElement = document.createElement('img');
        //imgElement.src = posterUrl;
       // const posterGrid=document.querySelector(".poster-grid");
       // posterGrid.appendChild(imgElement);
    //  });
 // })
 // .catch(error => {
 //   console.error('Error:', error);
 // });