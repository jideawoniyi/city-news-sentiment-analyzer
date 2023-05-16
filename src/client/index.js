import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import './styles/base.scss'
import './styles/resets.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

export {
    checkForName,
    handleSubmit
}

console.log(checkForName);

alert("I EXIST")

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let inputText = document.getElementById('name').value;
    checkForName(inputText);  // Call checkForName with the input text

    handleSubmit(event);  // Then handle the form submission
});
