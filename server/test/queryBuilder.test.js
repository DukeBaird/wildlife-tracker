/* eslint no-unused-vars: 0 */
const jest = require('jest');
const { queryBuilder } = require('../lib/sightingsController.js');

describe('Building queries from searchOpts', () => {
	test('No inputs', () => {
		const searchOpts = {};
		expect(queryBuilder(searchOpts)).toEqual({});
	});

	test('Only ID', () => {
		const searchOpts = {
			id: 'newuser'
		};
		expect(queryBuilder(searchOpts)).toEqual({
			spottedBy: { $in: 'newuser' }
		});
	});

	test('Only Location', () => {
		const searchOpts = {
			location: 'home'
		};
		expect(queryBuilder(searchOpts)).toEqual({
			location: { $in: 'home' }
		});
	});

	test('Only Animal', () => {
		const searchOpts = {
			animal: 'cat'
		};
		expect(queryBuilder(searchOpts)).toEqual({
			animal: { $in: 'cat' }
		});
	});

	test('All inputs', () => {
		const searchOpts = {
			id: 'newuser',
			animal: 'cat',
			location: 'home',
		};
		expect(queryBuilder(searchOpts)).toEqual({
			spottedBy: { $in: 'newuser' },
			animal: { $in: 'cat' },
			location: { $in: 'home' }
		});
	});
});
