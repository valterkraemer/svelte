import { test } from '../../test';

export default test({
	mode: ['client'], // a separate SSR test exists

	compileOptions: {
		preserveComments: true
	},

	html: `
    <p>before</p>
    <!-- a comment -->
    <p>after</p>
  `
});
