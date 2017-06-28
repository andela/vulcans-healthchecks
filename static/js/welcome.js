setTimeout(function() {

    var input = document.getElementById("pitch-url-input");
    input.addEventListener("click", function() {
        this.select();
    });

}, 1000);


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(index) {
  showSlides(slideIndex += index);
}

function currentSlide(index) {
  showSlides(slideIndex = index);
}

function showSlides(index) {
  var counter;
  var slides = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("dot");
  if (index > slides.length) {slideIndex = 1}
  if (index < 1) {slideIndex = slides.length}
  for (counter = 0; counter < slides.length; counter++) {
      slides[counter].style.display = "none";
  }
  for (counter = 0; counter < dots.length; counter++) {
      dots[counter].className = dots[counter].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


