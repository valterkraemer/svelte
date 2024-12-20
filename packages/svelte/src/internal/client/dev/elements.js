/** @import { SourceLocation } from '#shared' */

/**
 * @param {any} fn
 * @param {string} filename
 * @param {SourceLocation[]} locations
 * @returns {any}
 */
export function add_locations(fn, filename, locations) {
	return (/** @type {any[]} */ ...args) => {
		const dom = fn(...args);

		var node = dom.nodeType === 11 ? dom.firstChild : dom;
		assign_locations(node, filename, locations);

		return dom;
	};
}

/**
 * @param {Element} element
 * @param {string} filename
 * @param {SourceLocation} location
 */
function assign_location(element, filename, location) {
	// @ts-expect-error
	element.__svelte_meta = {
		loc: { file: filename, line: location[0], column: location[1] }
	};

	if (location[2]) {
		assign_locations(element.firstChild, filename, location[2]);
	}
}

/**
 * @param {Node | null} node
 * @param {string} filename
 * @param {SourceLocation[]} locations
 */
function assign_locations(node, filename, locations) {
	var i = 0;
	var depth = 0;

	while (node && i < locations.length) {
		if (depth === 0 && node.nodeType === 1) {
			assign_location(/** @type {Element} */ (node), filename, locations[i++]);
		}

		node = node.nextSibling;
	}
}
