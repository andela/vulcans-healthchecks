setTimeout(function() {

    var input = document.getElementById("pitch-url-input");
    input.addEventListener("click", function() {
        this.select();
    });

}, 1000);

//make automatic slide show
var slideIndex = 0;
showSlides();

function showSlides() {
    var counter;
    var slides = document.getElementsByClassName("slides");
    for (counter = 0; counter < slides.length; counter++) {
        slides[counter].style.display = "none";
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000);
}
