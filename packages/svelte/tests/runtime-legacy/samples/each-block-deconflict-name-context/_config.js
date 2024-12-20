import { test } from '../../test';

export default test({
	get props() {
		return { foo: { bar: ['x', 'y', 'z'] } };
	},

	html: `
		<input>
		<input>
		<input>
	`,

	test({ assert, component, target, window }) {
		const inputs = target.querySelectorAll('input');

		inputs[1].value = 'w';
		inputs[1].dispatchEvent(new window.MouseEvent('input'));

		assert.deepEqual(component.foo, {
			bar: ['x', 'w', 'z']
		});
	}
});
