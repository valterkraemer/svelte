/** @import { TemplateNode } from '#client' */
import { DEV } from 'esm-env';
import { init_array_prototype_warnings } from '../dev/equality.js';
import { get_descriptor } from '../../shared/utils.js';

// export these for reference in the compiled code, making global name deduplication unnecessary
/** @type {Window} */
export var $window;

/** @type {Document} */
export var $document;

/** @type {() => Node | null} */
var first_child_getter;
/** @type {() => Node | null} */
var next_sibling_getter;

/**
 * Initialize these lazily to avoid issues when using the runtime in a server context
 * where these globals are not available while avoiding a separate server entry point
 */
export function init_operations() {
	if ($window !== undefined) {
		return;
	}

	$window = window;
	$document = document;

	var element_prototype = Element.prototype;
	var node_prototype = Node.prototype;

	// @ts-ignore
	first_child_getter = get_descriptor(node_prototype, 'firstChild').get;
	// @ts-ignore
	next_sibling_getter = get_descriptor(node_prototype, 'nextSibling').get;

	// the following assignments improve perf of lookups on DOM nodes
	// @ts-expect-error
	element_prototype.__click = undefined;
	// @ts-expect-error
	element_prototype.__className = '';
	// @ts-expect-error
	element_prototype.__attributes = null;
	// @ts-expect-error
	element_prototype.__styles = null;
	// @ts-expect-error
	element_prototype.__e = undefined;

	// @ts-expect-error
	Text.prototype.__t = undefined;

	if (DEV) {
		// @ts-expect-error
		element_prototype.__svelte_meta = null;

		init_array_prototype_warnings();
	}
}

/**
 * @param {string} value
 * @returns {Text}
 */
export function create_text(value = '') {
	return document.createTextNode(value);
}

/**
 * @template {Node} N
 * @param {N} node
 * @returns {Node | null}
 */
/*@__NO_SIDE_EFFECTS__*/
export function get_first_child(node) {
	return first_child_getter.call(node);
}

/**
 * @template {Node} N
 * @param {N} node
 * @returns {Node | null}
 */
/*@__NO_SIDE_EFFECTS__*/
export function get_next_sibling(node) {
	return next_sibling_getter.call(node);
}

/**
 * Don't mark this as side-effect-free, hydration needs to walk all nodes
 * @template {Node} N
 * @param {N} node
 * @param {boolean} is_text
 * @returns {Node | null}
 */
export function child(node, is_text) {
	return get_first_child(node);
}

/**
 * Don't mark this as side-effect-free, hydration needs to walk all nodes
 * @param {DocumentFragment | TemplateNode[]} fragment
 * @param {boolean} is_text
 * @returns {Node | null}
 */
export function first_child(fragment, is_text) {
	// when not hydrating, `fragment` is a `DocumentFragment` (the result of calling `open_frag`)
	var first = /** @type {DocumentFragment} */ (get_first_child(/** @type {Node} */ (fragment)));

	// TODO prevent user comments with the empty string when preserveComments is true
	if (first instanceof Comment && first.data === '') return get_next_sibling(first);

	return first;
}

/**
 * Don't mark this as side-effect-free, hydration needs to walk all nodes
 * @param {TemplateNode} node
 * @param {number} count
 * @param {boolean} is_text
 * @returns {Node | null}
 */
export function sibling(node, count = 1, is_text = false) {
	let next_sibling = node;
	var last_sibling;

	while (count--) {
		last_sibling = next_sibling;
		next_sibling = /** @type {TemplateNode} */ (get_next_sibling(next_sibling));
	}

	return next_sibling;
}

/**
 * @template {Node} N
 * @param {N} node
 * @returns {void}
 */
export function clear_text_content(node) {
	node.textContent = '';
}
