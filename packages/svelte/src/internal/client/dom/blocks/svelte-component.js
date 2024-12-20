/** @import { TemplateNode, Dom, Effect } from '#client' */
import { EFFECT_TRANSPARENT } from '../../constants.js';
import { block, branch, pause_effect } from '../../reactivity/effects.js';

/**
 * @template P
 * @template {(props: P) => void} C
 * @param {TemplateNode} node
 * @param {() => C} get_component
 * @param {(anchor: TemplateNode, component: C) => Dom | void} render_fn
 * @returns {void}
 */
export function component(node, get_component, render_fn) {
	var anchor = node;

	/** @type {C} */
	var component;

	/** @type {Effect | null} */
	var effect;

	block(() => {
		if (component === (component = get_component())) return;

		if (effect) {
			pause_effect(effect);
			effect = null;
		}

		if (component) {
			effect = branch(() => render_fn(anchor, component));
		}
	}, EFFECT_TRANSPARENT);
}
