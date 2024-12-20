/** @import { Effect, TemplateNode } from '#client' */
import { FILENAME } from '../../../../constants.js';
import { block, branch, destroy_effect } from '../../reactivity/effects.js';
import { create_fragment_from_html } from '../reconciler.js';
import { assign_nodes } from '../template.js';
import * as w from '../../warnings.js';
import { hash, sanitize_location } from '../../../../utils.js';
import { DEV } from 'esm-env';
import { dev_current_component_function } from '../../runtime.js';
import { get_first_child, get_next_sibling } from '../operations.js';

/**
 * @param {Element} element
 * @param {string | null} server_hash
 * @param {string} value
 */
function check_hash(element, server_hash, value) {
	if (!server_hash || server_hash === hash(String(value ?? ''))) return;

	let location;

	// @ts-expect-error
	const loc = element.__svelte_meta?.loc;
	if (loc) {
		location = `near ${loc.file}:${loc.line}:${loc.column}`;
	} else if (dev_current_component_function?.[FILENAME]) {
		location = `in ${dev_current_component_function[FILENAME]}`;
	}
}

/**
 * @param {Element | Text | Comment} node
 * @param {() => string} get_value
 * @param {boolean} svg
 * @param {boolean} mathml
 * @param {boolean} [skip_warning]
 * @returns {void}
 */
export function html(node, get_value, svg, mathml, skip_warning) {
	var anchor = node;

	var value = '';

	/** @type {Effect | undefined} */
	var effect;

	block(() => {
		if (value === (value = get_value() ?? '')) {
			return;
		}

		if (effect !== undefined) {
			destroy_effect(effect);
			effect = undefined;
		}

		if (value === '') return;

		effect = branch(() => {
			var html = value + '';
			if (svg) html = `<svg>${html}</svg>`;
			else if (mathml) html = `<math>${html}</math>`;

			// Don't use create_fragment_with_script_from_html here because that would mean script tags are executed.
			// @html is basically `.innerHTML = ...` and that doesn't execute scripts either due to security reasons.
			/** @type {DocumentFragment | Element} */
			var node = create_fragment_from_html(html);

			if (svg || mathml) {
				node = /** @type {Element} */ (get_first_child(node));
			}

			assign_nodes(
				/** @type {TemplateNode} */ (get_first_child(node)),
				/** @type {TemplateNode} */ (node.lastChild)
			);

			if (svg || mathml) {
				while (get_first_child(node)) {
					anchor.before(/** @type {Node} */ (get_first_child(node)));
				}
			} else {
				anchor.before(node);
			}
		});
	});
}
