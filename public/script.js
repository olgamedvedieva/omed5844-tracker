const modal = document.querySelector("[data-modal]");
const openButton = document.querySelector(".hero-button");
const closeButton = document.getElementById("close-main-modal");
const overlay = document.querySelector('.dialog-overlay');
let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
const posterModal = document.createElement("dialog");
posterModal.classList.add("poster-modal");
posterModal.setAttribute("data-modal", "poster-modal");
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
    if (savedMovies == null) {
      savedMovies = [movie]
    } else {
      if (savedMovies.find(element => element.name === movie.name)){
        console.log('Movie already exists')
      } else {
        savedMovies.push(movie)
      }
    }
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
        
    console.log(JSON.parse(localStorage.getItem('savedMovies')))
    updateSaved();
    }
  updateSaved();

  function updateSaved() {
    let movies= JSON.parse(localStorage.getItem('savedMovies'));
    const posterGrid = document.querySelector('.poster-grid');
    posterGrid.innerHTML = '';
    if (movies !== null) {
      
      movies.forEach((movie) => {
        const encodedInput = encodeURIComponent(movie.name);      
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=1871ce5381b5ef8a5f45a43210139f5b&query=${encodedInput}`;

        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const movies = data.results;
            
            const chosenMovie = movies[0];

            const movieId = chosenMovie.id;

            const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1871ce5381b5ef8a5f45a43210139f5b`;

            fetch(movieDetailsUrl)
              .then(response => response.json())
              .then(details => {
                const posterPath = details.poster_path;

                const posterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
        
                const imgElement = document.createElement('img');
                imgElement.src = posterUrl;
                posterGrid.appendChild(imgElement);
                imgElement.addEventListener('click', () => {
                  document.body.appendChild(posterModal);
                  posterModal.showModal()
                  overlay.classList.add('dialog-open')
                  document.body.style.overflow = 'hidden';
                  
                  const modalImg=document.createElement("img");
                  modalImg.src=posterUrl;
                  modalImg.classList.add("modal-img");
                  posterModal.appendChild(modalImg);
                  
                  let heading = document.createElement("h1");
                  heading.innerHTML = movie.name.toUpperCase();
                  posterModal.appendChild(heading);
                  let subgenre = document.createElement("p");
                  subgenre.innerHTML = `<b>Subgenre</b>: ${movie.subgenre}`;
                  posterModal.appendChild(subgenre);
                
                  let releaseYear = document.createElement("p");
                  releaseYear.innerHTML = `<b>Release Year</b>: ${movie.releaseYear}`;
                  posterModal.appendChild(releaseYear);
                
                  let platform = document.createElement("p");
                  platform.innerHTML = `<b>Platform</b>: ${movie.platform}`;
                  posterModal.appendChild(platform);
                
                  let directorFormatted = movie.director.split(" ");
                  for (let i = 0; i < directorFormatted.length; i++) {
                    directorFormatted[i] = directorFormatted[i][0].toUpperCase() + directorFormatted[i].substr(1);
                  }
                  directorFormatted = directorFormatted.join(" ");
                  let director = document.createElement("p");
                  director.innerHTML =`<b>Director</b>: ${directorFormatted}`;
                  posterModal.appendChild(director);
                  
                  let date = document.createElement("p");
                  date.innerHTML = `<b>Date Added</b>: ${movie.date}`;
                  posterModal.appendChild(date);
                
                  let ratingModal = document.createElement("div");
                  let rating = movie.rating;
                  for (let i = 0; i < rating; i++) {
                    let starElement = document.createElement("span");
                    starElement.classList.add("filled-star"); 
                    starElement.innerHTML = "&#9733;"; 
                    ratingModal.appendChild(starElement);
                  }
      
                  for (let i = rating; i < 5; i++) {
                    let starElement = document.createElement("span");
                    starElement.classList.add("unfilled-star"); 
                    starElement.innerHTML = "&#9734;"; 
                    ratingModal.appendChild(starElement);
                  }
                  posterModal.appendChild(ratingModal);
                  let closeButtonPoster = document.createElement("button");
                  closeButtonPoster.innerHTML = "X";
                  closeButtonPoster.classList.add("close-poster-modal");
                  posterModal.appendChild(closeButtonPoster);
                  closeButtonPoster.addEventListener("click", () => {
                    posterModal.close()
                    overlay.classList.remove('dialog-open');
                    document.body.style.removeProperty('overflow');
                  });
                  let deleteButton = document.createElement("button");
                  deleteButton.innerHTML = "Delete";
                  deleteButton.classList.add("delete-movie-button");
                  posterModal.appendChild(deleteButton);
                  deleteButton.addEventListener('click', function(event){
                    imgElement.remove();
                    posterModal.close()
                    overlay.classList.remove('dialog-open');
                    document.body.style.removeProperty('overflow');
                    const index = movieList.indexOf(movie);
                    movieList.splice(index,1);
                    savedMovies.splice(index, 1);
                    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
                      
            
              });
          
          })
        })
        })
      })
      }
    }
      
 