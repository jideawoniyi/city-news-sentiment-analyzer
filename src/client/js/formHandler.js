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

        // Add each story to the results
        for (let story of data) {
            let storyDiv = document.createElement('div');
            storyDiv.className = 'news-story';
            storyDiv.innerHTML = `<h2>${story.title}</h2>`;
            storyDiv.addEventListener('click', function() {
                window.open(story.links.permalink, '_blank');
            });
            results.appendChild(storyDiv);
        }
    
    } catch (error) {
        console.error(error);
        const results = document.getElementById('results');
        results.innerHTML = 'Error occurred while fetching data.';
    }
};

export { handleSubmit };