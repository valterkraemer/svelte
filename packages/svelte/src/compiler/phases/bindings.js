/**
 * @typedef BindingProperty
 * @property {string} [event] This is set if the binding corresponds to the property name on the dom element it's bound to
 * 							  and there's an event that notifies of a change to that property
 * @property {boolean} [bidirectional] Set this to `true` if updates are written to the dom property
 * @property {string[]} [valid_elements] If this is set, the binding is only valid on the given elements
 * @property {string[]} [invalid_elements] If this is set, the binding is invalid on the given elements
 */

/**
 * @type {Record<string, BindingProperty>}
 */
export const binding_properties = {
	// media
	currentTime: {
		valid_elements: ['audio', 'video'],
		bidirectional: true
	},
	duration: {
		valid_elements: ['audio', 'video'],
		event: 'durationchange'
	},
	focused: {},
	paused: {
		valid_elements: ['audio', 'video'],
		bidirectional: true
	},
	buffered: {
		valid_elements: ['audio', 'video']
	},
	seekable: {
		valid_elements: ['audio', 'video']
	},
	played: {
		valid_elements: ['audio', 'video']
	},
	volume: {
		valid_elements: ['audio', 'video'],
		bidirectional: true
	},
	muted: {
		valid_elements: ['audio', 'video'],
		bidirectional: true
	},
	playbackRate: {
		valid_elements: ['audio', 'video'],
		bidirectional: true
	},
	seeking: {
		valid_elements: ['audio', 'video']
	},
	ended: {
		valid_elements: ['audio', 'video']
	},
	readyState: {
		valid_elements: ['audio', 'video']
	},
	// video
	videoHeight: {
		valid_elements: ['video'],
		event: 'resize'
	},
	videoWidth: {
		valid_elements: ['video'],
		event: 'resize'
	},
	// img
	naturalWidth: {
		valid_elements: ['img'],
		event: 'load'
	},
	naturalHeight: {
		valid_elements: ['img'],
		event: 'load'
	},
	// document
	activeElement: {
		valid_elements: ['svelte:document']
	},
	fullscreenElement: {
		valid_elements: ['svelte:document'],
		event: 'fullscreenchange'
	},
	pointerLockElement: {
		valid_elements: ['svelte:document'],
		event: 'pointerlockchange'
	},
	visibilityState: {
		valid_elements: ['svelte:document'],
		event: 'visibilitychange'
	},
	// window
	innerWidth: {
		valid_elements: ['svelte:window']
	},
	innerHeight: {
		valid_elements: ['svelte:window']
	},
	outerWidth: {
		valid_elements: ['svelte:window']
	},
	outerHeight: {
		valid_elements: ['svelte:window']
	},
	scrollX: {
		valid_elements: ['svelte:window'],
		bidirectional: true
	},
	scrollY: {
		valid_elements: ['svelte:window'],
		bidirectional: true
	},
	online: {
		valid_elements: ['svelte:window']
	},
	devicePixelRatio: {
		valid_elements: ['svelte:window'],
		event: 'resize'
	},
	// dimensions
	clientWidth: {
		invalid_elements: ['svelte:window', 'svelte:document']
	},
	clientHeight: {
		invalid_elements: ['svelte:window', 'svelte:document']
	},
	offsetWidth: {
		invalid_elements: ['svelte:window', 'svelte:document']
	},
	offsetHeight: {
		invalid_elements: ['svelte:window', 'svelte:document']
	},
	contentRect: {
		invalid_elements: ['svelte:window', 'svelte:document']
	},
	contentBoxSize: {
		invalid_elements: ['svelte:window', 'svelte:document']
	},
	borderBoxSize: {
		invalid_elements: ['svelte:window', 'svelte:document']
	},
	devicePixelContentBoxSize: {
		invalid_elements: ['svelte:window', 'svelte:document']
	},
	// checkbox/radio
	indeterminate: {
		event: 'change',
		bidirectional: true,
		valid_elements: ['input'] // no corresponding attribute
	},
	checked: {
		valid_elements: ['input'],
		bidirectional: true
	},
	group: {
		valid_elements: ['input'],
		bidirectional: true
	},
	// various
	this: {},
	innerText: {
		invalid_elements: ['svelte:window', 'svelte:document'],
		bidirectional: true
	},
	innerHTML: {
		invalid_elements: ['svelte:window', 'svelte:document'],
		bidirectional: true
	},
	textContent: {
		invalid_elements: ['svelte:window', 'svelte:document'],
		bidirectional: true
	},
	open: {
		event: 'toggle',
		bidirectional: true,
		valid_elements: ['details']
	},
	value: {
		valid_elements: ['input', 'textarea', 'select'],
		bidirectional: true
	},
	files: {
		valid_elements: ['input'],
		bidirectional: true
	}
};
