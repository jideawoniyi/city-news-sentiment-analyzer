const spinner = document.querySelector('.spinner');
const form = document.getElementById('form');

form.addEventListener('submit', handleSubmit);

function showSpinner() {
  spinner.style.display = 'block';
}

function hideSpinner() {
  spinner.style.display = 'none';
}

const handleSubmit = async (event) => {
  event.preventDefault();
  
  showSpinner(); // Show the spinner when form is submitted
  
  // Retrieve the city from the form input
  let cityInput = document.getElementById('name');
  let city = cityInput.value;
  
  if (!city) {
    hideSpinner(); // Hide the spinner if no city was input
    return;
  }
  
  try {
    const res = await fetch(`http://localhost:8081/aylien?city=${city}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      throw new Error('An error occurred with the Aylien API request.');
    }
  
    const data = await res.json();
    
    const results = document.getElementById('results');
    results.innerHTML = ''; // Clear current results
  
    if (data.length === 0) {
      displayError("No results found.");
      hideSpinner(); // Hide the spinner if no results were found
      return;
    }
  
    // Create a new div to contain all the stories
    let storiesContainer = document.createElement('div');
    storiesContainer.className = 'news-story-parent';


    // Append the storiesContainer to the results
    results.appendChild(storiesContainer);
  
    // Add each story to the storiesContainer
    let totalStories = data.length; // Get the total number of stories
    for (let i = 0; i < totalStories; i++) {
      // Create the story div
      let storyDiv = document.createElement('div');
      storyDiv.className = 'news-story';
      storyDiv.style.backgroundImage = `url('${data[i].image}')`;
      storyDiv.style.backgroundSize = 'cover';
      storyDiv.style.backgroundPosition = 'center';
  
      // Create the story title element
      let storyTitle = document.createElement('h2');
      storyTitle.textContent = `${i + 1}/${totalStories} - ${data[i].title}`;
      storyDiv.appendChild(storyTitle);
  
      // Create the story snippet element
      let storySnippet = document.createElement('p');
      storySnippet.textContent = data[i].snippet; // Text snippet from the article
      storyDiv.appendChild(storySnippet);
  
      // Retrieve sentiment and polarity from the API response
      let sentiment = data[i].sentiment;
      let polarity = sentiment ? sentiment.polarity : 'N/A';
      let confidence = sentiment ? sentiment.confidence : 'N/A';
  
      // Create the sentiment and polarity elements
      let sentimentElement = document.createElement('p');
      sentimentElement.textContent = `Sentiment: ${polarity}`;
      storyDiv.appendChild(sentimentElement);
  
      let polarityElement = document.createElement('p');
      polarityElement.textContent = `Polarity: ${polarity}`;
      storyDiv.appendChild(polarityElement);
  
      // Add click event listener to open the article in a new tab
      storyDiv.addEventListener('click', function () {
        window.open(data[i].links.permalink, '_blank');
      });
  
      // Append the story div to the storiesContainer
      storiesContainer.appendChild(storyDiv);
    }
  
    // Append the storiesContainer to the results
    results.appendChild(storiesContainer);
    hideSpinner(); // Hide the spinner when results are displayed
  } catch (error) {
    console.error(error);
    displayError("Error occurred while fetching data.");
    hideSpinner(); // Hide the spinner if an error occurred
  }
};
  
// Helper function to display error message
const displayError = (message) => {
  const errorElement = document.createElement('p');
  errorElement.classList.add('error-message');
  errorElement.textContent = message;
  document.getElementById('results').innerHTML = '';
  document.getElementById('results').appendChild(errorElement);
};

export { handleSubmit };
