const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Retrieve the city from the form input
    let cityInput = document.getElementById('name');
    let city = cityInput.value;
  
    if (!city) {
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
  
      // Create a new div to contain all the stories
      let storiesContainer = document.createElement('div');
      storiesContainer.className = 'news-story-parent';
  
      // Add each story to the storiesContainer
      let totalStories = data.length; // Get the total number of stories
      for (let i = 0; i < totalStories; i++) {
        // Create the story div
        let storyDiv = document.createElement('div');
        storyDiv.className = 'news-story';
  
        // Create the story title element
        let storyTitle = document.createElement('h2');
        storyTitle.textContent = `${i + 1}/${totalStories} - ${data[i].title}`;
        storyDiv.appendChild(storyTitle);
  
        // Create the story snippet element
        let storySnippet = document.createElement('p');
        storySnippet.textContent = data[i].snippet; // Text snippet from the article
        storyDiv.appendChild(storySnippet);
  
        // Retrieve polarity from the API response
        let polarity = data[i].sentiment.title.polarity;
  
        // Create the polarity element
        let polarityElement = document.createElement('p');
        if (polarity) {
          polarityElement.textContent = `Polarity: ${polarity === 'positive' ? 'Positive' : 'Negative'}`;
        } else {
          polarityElement.textContent = 'Polarity: N/A';
        }
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
    } catch (error) {
      console.error(error);
      const results = document.getElementById('results');
      results.innerHTML = 'Error occurred while fetching data.';
    }
  };
  
  export { handleSubmit };
  