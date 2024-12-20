import * as fs from 'node:fs';
import * as path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

const pkg = JSON.parse(fs.readFileSync('packages/svelte/package.json', 'utf8'));

export default defineConfig({
	resolve: {
		alias: [
			{
				find: /^svelte\/?/,
				customResolver: (id, importer) => {
					// For some reason this turns up as "undefined" instead of "svelte/"
					const exported = pkg.exports[id === 'undefined' ? '.' : id.replace('undefined', './')];
					if (!exported) return;

					return path.resolve('packages/svelte', exported.browser ?? exported.default);
				}
			}
		]
	},
	test: {
		dir: '.',
		reporters: ['dot'],
		include: ['packages/svelte/**/*.test.ts', 'packages/svelte/tests/*/test.ts'],
		exclude: [...configDefaults.exclude, '**/samples/**']
	}
});
