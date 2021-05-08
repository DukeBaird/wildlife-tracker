const jest = require('jest');
const testFunction = require('../lib/sample.js');

describe('Group of functions', () => {
	test('function: testFunction', () => {
		expect(testFunction(1,2)).toBe(3);
		expect(testFunction(1,-1)).toBe(0);
		expect(testFunction(1,0)).toBe(99); // this should fail
	});

	// Other functions would go here
});
