/** @import { Effect, TemplateNode } from '#client' */
import { EFFECT_TRANSPARENT } from '../../constants.js';
import { block, branch, pause_effect, resume_effect } from '../../reactivity/effects.js';
import { UNINITIALIZED } from '../../../../constants.js';

/**
 * @param {TemplateNode} node
 * @param {(branch: (fn: (anchor: Node) => void, flag?: boolean) => void) => void} fn
 * @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
 * @returns {void}
 */
export function if_block(node, fn, elseif = false) {
	var anchor = node;

	/** @type {Effect | null} */
	var consequent_effect = null;

	/** @type {Effect | null} */
	var alternate_effect = null;

	/** @type {UNINITIALIZED | boolean | null} */
	var condition = UNINITIALIZED;

	var flags = elseif ? EFFECT_TRANSPARENT : 0;

	var has_branch = false;

	const set_branch = (/** @type {(anchor: Node) => void} */ fn, flag = true) => {
		has_branch = true;
		update_branch(flag, fn);
	};

	const update_branch = (
		/** @type {boolean | null} */ new_condition,
		/** @type {null | ((anchor: Node) => void)} */ fn
	) => {
		if (condition === (condition = new_condition)) return;

		if (condition) {
			if (consequent_effect) {
				resume_effect(consequent_effect);
			} else if (fn) {
				consequent_effect = branch(() => fn(anchor));
			}

			if (alternate_effect) {
				pause_effect(alternate_effect, () => {
					alternate_effect = null;
				});
			}
		} else {
			if (alternate_effect) {
				resume_effect(alternate_effect);
			} else if (fn) {
				alternate_effect = branch(() => fn(anchor));
			}

			if (consequent_effect) {
				pause_effect(consequent_effect, () => {
					consequent_effect = null;
				});
			}
		}
	};

	block(() => {
		has_branch = false;
		fn(set_branch);
		if (!has_branch) {
			update_branch(null, null);
		}
	}, flags);
}
