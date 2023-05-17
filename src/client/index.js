import { checkForName } from './js/nameChecker';
import { handleSubmit } from './js/formHandler';
import './styles/base.scss';
import './styles/resets.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/news-story.scss';
import './styles/news-story-parent.scss';
import './styles/error.scss';


console.log(checkForName);

alert("I EXIST");

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let inputText = document.getElementById('name').value;
    checkForName(inputText);  // Call checkForName with the input text

    handleSubmit(event);  // Then handle the form submission
});

var prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  var scrollHeight = document.body.scrollHeight;
  var totalHeight = currentScrollPos + window.innerHeight;

  if (totalHeight >= scrollHeight) {
    // Scrolling to the bottom of the page
    document.querySelector("footer").classList.add("visible");
  } else if (prevScrollPos > currentScrollPos) {
    // Scrolling up
    document.querySelector("footer").classList.remove("visible");
  }

  prevScrollPos = currentScrollPos;
};
