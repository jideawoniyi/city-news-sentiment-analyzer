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
  
  showSpinner();

  let cityInput = document.getElementById('name');
  let city = cityInput.value;

  if (!city) {
    hideSpinner();
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
    results.innerHTML = '';

    if (data.length === 0) {
      displayError("No results found.");
      hideSpinner();
      return;
    }

    let storiesContainer = document.createElement('div');
    storiesContainer.className = 'news-story-parent';
    results.appendChild(storiesContainer);

    let totalStories = data.length;
    for (let i = 0; i < totalStories; i++) {
      let storyDiv = document.createElement('div');
      storyDiv.className = 'news-story';
      storyDiv.style.backgroundImage = `url('${data[i].image}')`;
      storyDiv.style.backgroundSize = 'cover';
      storyDiv.style.backgroundPosition = 'center';

      let storyTitle = document.createElement('h2');
      storyTitle.textContent = `${i + 1}/${totalStories} - ${data[i].title}`;
      storyDiv.appendChild(storyTitle);

      let storySnippet = document.createElement('p');
      storySnippet.textContent = data[i].snippet;
      storyDiv.appendChild(storySnippet);

      let sentiment = data[i].sentiment;
      let polarity = sentiment ? sentiment.polarity : 'N/A';
      let confidence = sentiment ? sentiment.confidence : 'N/A';

      let sentimentSection = document.createElement('div');
      sentimentSection.className = 'sentiment-section';

      let sentimentHeader = document.createElement('h3');
      sentimentHeader.textContent = "Sentiment";
      sentimentHeader.className = 'sentiment-header';
      sentimentSection.appendChild(sentimentHeader);

      let horizontalLine = document.createElement('hr');
      sentimentSection.appendChild(horizontalLine);

      let polarityElement = document.createElement('p');
      polarityElement.className = polarity;
      polarityElement.textContent = `Polarity: ${polarity}`;
      sentimentSection.appendChild(polarityElement);

      let confidenceElement = document.createElement('p');
      confidenceElement.textContent = `Confidence: ${confidence}`;
      sentimentSection.appendChild(confidenceElement);

      storyDiv.appendChild(sentimentSection);

      storyDiv.addEventListener('click', function () {
        window.open(data[i].links.permalink, '_blank');
      });

      storiesContainer.appendChild(storyDiv);
    }

    results.appendChild(storiesContainer);
    hideSpinner();
  } catch (error) {
    console.error(error);
    displayError("Error occurred while fetching data.");
    hideSpinner();
  }
};

const displayError = (message) => {
  const errorElement = document.createElement('p');
  errorElement.classList.add('error-message');
  errorElement.textContent = message;
  document.getElementById('results').innerHTML = '';
  document.getElementById('results').appendChild(errorElement);
};

export { handleSubmit };
