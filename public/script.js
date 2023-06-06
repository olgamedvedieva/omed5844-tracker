const modal = document.querySelector("[data-modal]");
const openButton = document.querySelector(".hero-button");
const closeButton = document.getElementById("close-main-modal");
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
const movielistElem = document.getElementById('movieList');


form.addEventListener('submit', function(event) {
  event.preventDefault();
   
  addMovie(
    form.elements.movieName.value,
    form.elements.subgenre.value,
    form.elements.releaseYear.value,
    form.elements.platform.value,
    form.elements.director.value,
    document.querySelector('input[name="rating"]:checked').value
    );
  modal.close();
  overlay.classList.remove('dialog-open');
  document.body.style.removeProperty('overflow');
  form.reset()
  });

  var movieList = [];
  function addMovie(name, subgenre, releaseYear, platform, director, rating) {
    // Create a movie object
    let movie = {
      name,
      subgenre,
      releaseYear,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      platform,
      director,
      rating
    };
    console.log(movie);
    movieList.push(movie);
    const encodedInput = encodeURIComponent(movie.name);

// Construct the API request URL with the encoded user input
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=1871ce5381b5ef8a5f45a43210139f5b&query=${encodedInput}`;

// Make the API request using fetch or any other HTTP library
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract movie details from the API response
        const movies = data.results;
        
        // Assuming you want to select the first movie from the search results
        const chosenMovie = movies[0];

        // Retrieve the movie ID
        const movieId = chosenMovie.id;

        // Make a request to fetch movie details including the poster
        const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1871ce5381b5ef8a5f45a43210139f5b`;

        fetch(movieDetailsUrl)
          .then(response => response.json())
          .then(details => {
            // Extract the poster path from the movie details
            const posterPath = details.poster_path;

            // Construct the poster URL using the retrieved poster path
            const posterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
    
            // Display the movie poster in your web application
            const imgElement = document.createElement('img');
            imgElement.src = posterUrl;
            const posterGrid = document.querySelector('.poster-grid');
            posterGrid.appendChild(imgElement);
            imgElement.addEventListener('click', () => {
              const posterModal = document.createElement("dialog");
              posterModal.classList.add("poster-modal");
              posterModal.setAttribute("data-modal", "poster-modal");
              document.body.appendChild(posterModal);
              posterModal.showModal()
              overlay.classList.add('dialog-open')
              document.body.style.overflow = 'hidden';
              
              let heading = document.createElement("h1");
              heading.innerHTML = movie.name.toUpperCase();
              posterModal.appendChild(heading);
          
              let subgenre = document.createElement("p");
              subgenre.innerHTML = movie.subgenre;
              posterModal.appendChild(subgenre);
            
              let releaseYear = document.createElement("p");
              releaseYear.innerHTML = movie.releaseYear;
              posterModal.appendChild(releaseYear);
            
              let platform = document.createElement("p");
              platform.innerHTML = movie.platform;
              posterModal.appendChild(platform);
            
              let director = document.createElement("p");
              director.innerHTML = movie.director;
              posterModal.appendChild(director);
            
              let date = document.createElement("p");
              date.innerHTML = movie.date;
              posterModal.appendChild(date);
            
              let rating = document.createElement("p");
              rating.innerHTML = movie.rating;
              posterModal.appendChild(rating);
            
              // Add close button
              let closeButtonPoster = document.createElement("button");
              closeButtonPoster.innerHTML = "X";
              closeButtonPoster.classList.add("close-poster-modal");
              posterModal.appendChild(closeButtonPoster);
              closeButtonPoster.addEventListener("click", () => {
                posterModal.close()
                overlay.classList.remove('dialog-open');
                document.body.style.removeProperty('overflow');
              });
          
            });
         
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  