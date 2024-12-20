/** @import { TemplateNode } from '#client' */
import { create_text } from '../operations.js';
import { block } from '../../reactivity/effects.js';
import { HEAD_EFFECT } from '../../constants.js';

/**
 * @type {Node | undefined}
 */
let head_anchor;

export function reset_head_anchor() {
	head_anchor = undefined;
}

/**
 * @param {(anchor: Node) => void} render_fn
 * @returns {void}
 */
export function head(render_fn) {
	/** @type {Comment | Text} */
	var anchor;

	anchor = document.head.appendChild(create_text());

	try {
		block(() => render_fn(anchor), HEAD_EFFECT);
	} finally {
		//
	}
}
