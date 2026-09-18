function toggleCS50(el) {
  const card = el.parentElement;
  const list = card.querySelector(".cs50-list");

  if (list) {
    list.classList.toggle("hidden");
  }
}