function displayMessage(message, isError) {
    const results = document.getElementById('results');
    results.innerHTML = ''; // Clear current results
  
    const messageContainer = document.createElement('div');
    messageContainer.textContent = message;
  
    if (isError) {
      messageContainer.classList.add('message-container');
    }
  
    results.appendChild(messageContainer);
  }
  
  export { displayMessage };
  