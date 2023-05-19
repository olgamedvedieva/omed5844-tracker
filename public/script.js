const movieForm = document.getElementById("movieForm");
const showFormButton = document.getElementById("addButton");
showFormButton.addEventListener("click", openForm);
function openForm() {
  console.log('test')
  movieForm.style.display = "block";
}