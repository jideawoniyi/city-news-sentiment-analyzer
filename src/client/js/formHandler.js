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
            let p = document.createElement('p');
            p.textContent = story.title;
            results.appendChild(p);
        }
    } catch (error) {
        console.error(error);
        const results = document.getElementById('results');
        results.innerHTML = 'Error occurred while fetching data.';
    }
};

export { handleSubmit };
