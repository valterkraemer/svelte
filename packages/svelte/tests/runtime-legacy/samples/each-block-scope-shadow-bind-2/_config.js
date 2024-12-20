import { flushSync } from 'svelte';
import { ok, test } from '../../test';

export default test({
	html: `
    Hello
    <input />
	`,

	test({ assert, target, window }) {
		const input = target.querySelector('input');
		ok(input);

		input.value = 'abcd';
		input.dispatchEvent(new window.Event('input'));
		flushSync();

		assert.htmlEqual(
			target.innerHTML,
			`
        abcd
        <input />
      `
		);
	}
});
