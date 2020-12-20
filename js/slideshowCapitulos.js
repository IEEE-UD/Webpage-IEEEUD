var slideIndex = 1;
var slideBox = ["mySlides1","mySlides2","mySlides3","mySlides4"]
var slideBoxIndex = 0;
showSlides(slideIndex, slideBoxIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n, slideBoxIndex);
}

function plusSlidesBox(n) {
  slideBoxIndex = n;
  showSlides(slideIndex, slideBoxIndex);
}


function showSlides(n, m) {
  var i;
  var j;
  for (i = 0; i < slideBox.length;i++){
	  var slides = document.getElementsByClassName(slideBox[i]);
	  for (j = 0; j < slides.length; j++) {
		  slides[j].style.display = "none";
	  }
  }
  
  slides = document.getElementsByClassName(slideBox[m]);
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  slides[slideIndex-1].style.display = "block";
 
}

