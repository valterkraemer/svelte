import { test } from '../../test';

export default test({
	compileOptions: {
		dev: true
	},

	skip_mode: [],

	warnings: [
		'The `render` function passed to `createRawSnippet` should return HTML for a single element'
	]
});
