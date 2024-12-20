/** @import { TemplateNode } from '#client' */
import { render_effect, teardown } from '../../reactivity/effects.js';
import { get_first_child } from '../operations.js';

/**
 * @param {HTMLDivElement | SVGGElement} element
 * @param {() => Record<string, string>} get_styles
 * @returns {void}
 */
export function css_props(element, get_styles) {
	render_effect(() => {
		var styles = get_styles();

		for (var key in styles) {
			var value = styles[key];

			if (value) {
				element.style.setProperty(key, value);
			} else {
				element.style.removeProperty(key);
			}
		}
	});

	teardown(() => {
		element.remove();
	});
}
