const modal = document.querySelector("[data-modal]");
const openButton = document.querySelector(".hero-button");
const closeButton = document.getElementById("close-main-modal");
const overlay = document.querySelector('.dialog-overlay');
let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
//i had a lot of issues with scoping, so I chose to put this line for local storage here and it seems to have helped
const posterModal = document.createElement("dialog");
posterModal.classList.add("poster-modal");
posterModal.setAttribute("data-modal", "poster-modal");
//here I am creating a dialog element as per this really helpful blog, source:https://blog.webdevsimplified.com/2023-04/html-dialog
//I have defined a few variables here as I wanted them to be accesible globally and also the following function is quite long
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
//I am using event listeners here to control the "overflow" property depending on whether the modal is open or not as per this website, source:https://htmldom.dev/prevent-body-from-scrolling-when-opening-a-modal/
const buttonTop=document.getElementById("top");
buttonTop.addEventListener("click",() => {
  window.scrollTo(0,0)
});//this scrolls to the very top coordinates of the page, as detailed in this video here, source:https://www.youtube.com/watch?v=FK5DEa1Hvco&t=1s
const form = document.getElementById("movieForm");
form.addEventListener('submit', function(event) {
  event.preventDefault();
  //as soon as the form is submitted, I prevent the default handling of it and its subsequent send-off, as I would like to handle the input myself 
  addMovie(
    form.elements.movieName.value,
    form.elements.subgenre.value,
    form.elements.releaseYear.value,
    form.elements.platform.value,
    form.elements.director.value,
    document.querySelector('input[name="rating"]:checked').value
    );
  //The rating is different to the rest of the elements, so I am selecting the one that has been checked to later process it as per this source:https://www.javatpoint.com/how-to-check-a-radio-button-using-javascript#:~:text=Get%20the%20value%20of%20selected%20radio%20button%3A%20querySelector()&text=Remember%20you%20need%20to%20specify,the%20group%20of%20radio%20buttons.
  modal.close();
  overlay.classList.remove('dialog-open');
  document.body.style.removeProperty('overflow');
  form.reset()
  });
  //This code below is partially adapted from the TaskList tutorials - I am essentially creating an array of movies and pushing all of the user input as well as the system generated one inside for each individual item
  var movieList = [];
  function addMovie(name, subgenre, releaseYear, platform, director, rating) {
    let movie = {
      name,
      subgenre,
      releaseYear,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      //I used the method above to convert the date into a human readable format with dashes, as per this source:https://www.freecodecamp.org/news/javascript-date-now-how-to-get-the-current-date-in-javascript/
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
        alert('Movie already exists')
      } else {
        savedMovies.push(movie)
      }
    }
    //checking whether this movie has already been put into the array; if yes, the user gets an alert
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
        
    console.log(JSON.parse(localStorage.getItem('savedMovies')))
    updateSaved();
    }
  updateSaved();
    //Adapted from Countries of the World API tutorials, this saves the newly added movies into local storage
  function updateSaved() {
    let movies= JSON.parse(localStorage.getItem('savedMovies'));
    const posterGrid = document.querySelector('.poster-grid');
    posterGrid.innerHTML = '';
        //What this does is basically make the .poster-grid innerHTML empty before we append each new movie, so that there aren't duplicates
    if (movies !== null) {
      //checking whether the array is empty
      //I used chatGPT,TMDB's API's development documentation and the Countries of the World API tutorials to help write the following code, source:https://developer.themoviedb.org/docs/faq, https://chat.openai.com/
      movies.forEach((movie) => {
        const encodedInput = encodeURIComponent(movie.name);      
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=1871ce5381b5ef8a5f45a43210139f5b&query=${encodedInput}`;
        //this is using the API key that I applied for as well as the encoded movie name to search for it within the API database
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const movies = data.results;
            //looking at all of the search results as a whole
            const chosenMovie = movies[0];
            //this is something that is a bit concerning, as it is assuming that the first poster is going to be the correct one - I haven't found a way to overcome this, but definitely something to consider, maybe adding the date to the search criteria would help
            const movieId = chosenMovie.id;
            
            const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1871ce5381b5ef8a5f45a43210139f5b`;
            //now this URL has the specific movie we want, as opposed to just a general search
            fetch(movieDetailsUrl)
              .then(response => response.json())
              .then(details => {
                const posterPath = details.poster_path;

                const posterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
               //now the movie URL has been used to find the specific image path for the poster and convert it into a source to use within my code
                const imgElement = document.createElement('img');
                imgElement.src = posterUrl;
                posterGrid.appendChild(imgElement);
                //this just created an individual image Element within the already stylised posterGrid - this image element will correspond the movie name that the user put into the form
                imgElement.addEventListener('click', () => {
                  document.body.appendChild(posterModal);
                  //adding the individualised posterModal attached to a specific movie to the body
                  posterModal.innerHTML = "";
                  //emptying innerHTML to prevent duplicates
                  posterModal.showModal();
                  posterModal.style.display = "flex";
                  overlay.classList.add('dialog-open')
                  //this is something that I had no idea until I had someone who is a professional programmer take a look at - because I was using flex box within my modal in CSS, it was interfering with the way that it was being removed later, as it must be tailroed to check for a different condition. Hence why I included flex here.
                  document.body.style.overflow = 'hidden';
                  const modalImg=document.createElement("img");
                  modalImg.src=posterUrl;
                  //assigning posterURL as image source
                  modalImg.classList.add("modal-img");
                  posterModal.appendChild(modalImg);
                  //inserting same image into the modal itself
                  let heading = document.createElement("h1");
                  heading.innerHTML = movie.name.toUpperCase();
                  //toUpperCase() was used for styling purposes as well as to prevent user input displaying in lower case, in case that was the way they typed it in
                  posterModal.appendChild(heading);
                   //inserting heading into Modal
                  let subgenre = document.createElement("p");
                  subgenre.innerHTML = `<b>Subgenre</b>: ${movie.subgenre}`;
                  posterModal.appendChild(subgenre);
                   //inserting subgenre into Modal - the bold tags are used to differentiate the label for later styling in CSS
                  let releaseYear = document.createElement("p");
                  releaseYear.innerHTML = `<b>Release Year</b>: ${movie.releaseYear}`;
                  posterModal.appendChild(releaseYear);
                  //inserting release year into modal
                  let platform = document.createElement("p");
                  platform.innerHTML = `<b>Platform</b>: ${movie.platform}`;
                  posterModal.appendChild(platform);
                  //inserting platfrom into modal
                  let directorFormatted = movie.director.split(" ");
                  for (let i = 0; i < directorFormatted.length; i++) {
                    directorFormatted[i] = directorFormatted[i][0].toUpperCase() + directorFormatted[i].substr(1);
                  }
                  directorFormatted = directorFormatted.join(" ");
                  //I used this method to essentially format the director's name in case the user input it in lowercase, as per this source:https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
                  let director = document.createElement("p");
                  director.innerHTML =`<b>Director</b>: ${directorFormatted}`;
                  posterModal.appendChild(director);
                  
                  let date = document.createElement("p");
                  date.innerHTML = `<b>Date Added</b>: ${movie.date}`;
                  posterModal.appendChild(date);
                //inserting director into modal
                  let ratingModal = document.createElement("div");
                  let rating = movie.rating;
                  for (let i = 0; i < rating; i++) {
                    let starElement = document.createElement("span");
                    starElement.classList.add("filled-star"); 
                    starElement.innerHTML = "&#9733;"; 
                    ratingModal.appendChild(starElement);
                  }
                  //this was a bit more complicated, I used chatGPT to help me figure this out - essentially this is comparing the movie.rating against a score of five and then later filling in the stars based on that fraction, source:https://chat.openai.com/
                  for (let i = rating; i < 5; i++) {
                    let starElement = document.createElement("span");
                    starElement.classList.add("unfilled-star"); 
                    starElement.innerHTML = "&#9734;"; 
                    ratingModal.appendChild(starElement);
                  }
                  posterModal.appendChild(ratingModal);
                  //inserting rating into modal
                  let closeButtonPoster = document.createElement("button");
                  closeButtonPoster.innerHTML = "X";
                  closeButtonPoster.classList.add("close-poster-modal");
                  posterModal.appendChild(closeButtonPoster);
                   //created the close button for the poster modal
                  closeButtonPoster.addEventListener("click", () => {
                    posterModal.close();
                    posterModal.style.display = "none";
                    //this was the issue with the flex box that I was talking about, only when display is equal to none is the modal able to truly close
                    overlay.classList.remove('dialog-open');
                    document.body.style.removeProperty('overflow');
                  });
                  let deleteButton = document.createElement("button");
                  deleteButton.innerHTML = "Delete";
                  deleteButton.classList.add("delete-movie-button");
                  posterModal.appendChild(deleteButton);
                  //adding delete button for the movie itself, both for the posterGrid and local storage
                  deleteButton.addEventListener('click', function(event){
                    imgElement.remove();
                    posterModal.close();
                    posterModal.style.display = "none";
                    overlay.classList.remove('dialog-open');
                    document.body.style.removeProperty('overflow');
                    const index = movieList.indexOf(movie);
                    movieList.splice(index,1);
                    savedMovies.splice(index, 1);
                    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
                     //I used this source to see how best to splice the specific index from the saved array, source:https://sentry.io/answers/remove-specific-item-from-array/#:~:text=If%20you%20want%20to%20remove,to%20remove%20the%20first%20element.
            
              });
          
          })
        })
        })
      })
      }
    }
      
 