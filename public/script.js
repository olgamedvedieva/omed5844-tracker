const movieForm = document.getElementById("movieForm");
const showFormButton = document.querySelector(".hero-button");
showFormButton.addEventListener("click", openForm);
function openForm() {
  console.log('test')
  movieForm.style.display = "block";
}