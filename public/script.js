const modal = document.querySelector("[data-modal]");
const openButton = document.querySelector(".hero-button");
const closeButton = document.querySelector(".close-modal-button");
openButton.addEventListener("click", () => {
  modal.showModal()
})
closeButton.addEventListener("click", () => {
  modal.close()
})