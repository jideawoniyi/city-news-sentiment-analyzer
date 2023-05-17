// Import the js file to test
import { checkForName } from "../src/client/js/checkForName";

// Mock the global alert function
global.alert = jest.fn();

describe("Testing the name checking functionality", () => {
    test("Testing the checkForName() function", () => {
        expect(checkForName).toBeDefined();
    });

    test("Testing the checkForName() function for a match", () => {
        checkForName("Picard");
        expect(global.alert).toHaveBeenCalledWith("Welcome, Captain!");
    });

    test("Testing the checkForName() function for no match", () => {
        global.alert.mockClear();
        checkForName("Not a captain");
        expect(global.alert).not.toHaveBeenCalled();
    });
});
