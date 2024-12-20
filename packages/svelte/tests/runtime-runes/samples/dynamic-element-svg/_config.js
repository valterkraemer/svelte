import { test } from '../../test';

export default test({
	mode: [],

	test({ assert, target }) {
		const svg = target.querySelector('svg');
		const circle = target.querySelector('circle');

		assert.equal(svg?.getAttribute('viewBox'), '0 0 1000 1000');
		assert.equal(svg?.namespaceURI, 'http://www.w3.org/2000/svg');
		assert.equal(circle?.namespaceURI, 'http://www.w3.org/2000/svg');
	}
});
