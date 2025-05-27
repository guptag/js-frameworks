function showslide(activeSlideClass) {
  // show the active slide and hide the rest
  const elements = document.getElementsByClassName("slide");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains(activeSlideClass)) {
      elements[i].style.display = "block";
    } else {
      elements[i].style.display = "none";
    }
  }

  const nav = document.querySelector("nav ul");
  const ulElements = nav.getElementsByTagName("li");
  for (let i = 0; i < ulElements.length; i++) {
    if (ulElements[i].classList.contains(activeSlideClass)) {
      ulElements[i].classList.add("selected");
    } else {
      ulElements[i].classList.remove("selected");
    }
  }
}
