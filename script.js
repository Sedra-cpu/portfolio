document.getElementById("btn").addEventListener("click", function(){

  alert("Welcome to my portfolio!");});

function toggleCS50(el) {
  const card = el.parentElement;
  const list = card.querySelector(".cs50-list");

  list.classList.toggle("hidden");
}

