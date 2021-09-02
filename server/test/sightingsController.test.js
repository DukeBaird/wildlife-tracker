/* eslint no-unused-vars: 0 */
const jest = require('jest');
const { queryBuilder } = require('../lib/sightingsController.js');

describe('module sightingsController:', () => {
	describe('function queryBuilder:', () => {
		test('Should return an empty JSON when no inputs', () => {
			const searchOpts = {};
			expect(queryBuilder(searchOpts)).toEqual({});
		});

		test('Should add user id correctly as a search option', () => {
			const searchOpts = {
				id: 'newuser'
			};
			expect(queryBuilder(searchOpts)).toEqual({
				spottedBy: { $in: 'newuser' }
			});
		});

		test('Should add location correctly as a search option', () => {
			const searchOpts = {
				location: 'home'
			};
			expect(queryBuilder(searchOpts)).toEqual({
				location: { $in: 'home' }
			});
		});

		test('Should add animal correctly as a search option', () => {
			const searchOpts = {
				animal: 'cat'
			};
			expect(queryBuilder(searchOpts)).toEqual({
				animal: { $in: 'cat' }
			});
		});

		test('Should correctly add all inputs as search options', () => {
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
});
