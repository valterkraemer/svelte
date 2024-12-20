import { test } from '../../test';
import { expect, vi } from 'vitest';

const log = vi.fn();

export default test({
	html: '1 2 <div></div> <div></div> <input type="number"> <input type="number">',
	props: {
		log
	},
	before_test() {
		log.mockClear();
	},
	test() {
		expect(log).toHaveBeenCalledWith('DIV', 'DIV');
	}
});
