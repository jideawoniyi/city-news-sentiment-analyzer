// Import the js file to test
import { handleSubmit } from '../src/client/js/formHandler';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

// Set up a mock for the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ title: 'Testing the handleSubmit() function', links: { permalink: 'https://example.com' } }])
  })
);

// Helper function to create a basic HTML structure for testing
function createTestHTML() {
  document.body.innerHTML = `
    <form>
      <input type="text" id="name" />
      <button type="submit">Submit</button>
    </form>
    <div id="results"></div>
  `;
}

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
describe('Testing the submit functionality', () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test('Testing the handleSubmit() function', async () => {
    createTestHTML();
    const form = document.querySelector('form');
    const input = document.getElementById('name');

    input.value = 'New York';
    fireEvent.submit(form);

    // Wait for the DOM to be updated
    await new Promise(resolve => setTimeout(resolve, 0));

    // Define the expected output, if any, in the form of variables/array
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8081/aylien?city=New York', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const results = document.getElementById('results');
    expect(results.children.length).toBe(1);
  });
});
