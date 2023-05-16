const handleSubmit = async (event) => {
    event.preventDefault();

    // check what text was put into the form field
    let city = document.getElementById('name').value;

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
        let totalStories = data.length;  // Get the total number of stories
        for (let i = 0; i < totalStories; i++) {  // Note: i starts from 0
            let storyDiv = document.createElement('div');
            storyDiv.className = 'news-story';
            storyDiv.innerHTML = `<h2>${i+1}/${totalStories} - ${data[i].title}</h2>`;  // Display story number

            storyDiv.addEventListener('click', function() {
                window.open(data[i].links.permalink, '_blank');
            });
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
