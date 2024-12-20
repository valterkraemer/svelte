import { ok, test } from '../../test';

export default test({
	withoutNormalizeHtml: true,
	// Unable to test `html` with `<textarea>` content
	// as the textarea#value will not show within `innerHtml`

	test({ assert, target }) {
		// Test for <textarea> tag
		const elementTextarea = /** @type {HTMLTextAreaElement} */ (target.querySelector('#textarea'));
		// Test for <textarea> tag in non <textarea> tag
		const elementDivWithTextarea = /** @type {HTMLDivElement} */ (
			target.querySelector('#div-with-textarea')
		);
		// Test for <textarea> tag with leading newline
		const elementTextareaWithLeadingNewline = target.querySelector(
			'#textarea-with-leading-newline'
		);
		const elementTextareaWithoutLeadingNewline = target.querySelector(
			'#textarea-without-leading-newline'
		);
		const elementTextareaWithMultipleLeadingNewline = target.querySelector(
			'#textarea-with-multiple-leading-newlines'
		);
		const elementDivWithTextareaWithMultipleLeadingNewline = target.querySelector(
			'#div-with-textarea-with-multiple-leading-newlines'
		);

		ok(elementTextareaWithLeadingNewline);
		ok(elementTextareaWithoutLeadingNewline);
		ok(elementTextareaWithMultipleLeadingNewline);
		ok(elementDivWithTextareaWithMultipleLeadingNewline);

		assert.equal(
			elementTextarea.value,
			`  A
  B
`
		);
		assert.equal(
			/** @type {HTMLTextAreaElement} */ (elementDivWithTextarea.children[0]).value,
			`    A
    B
  `
		);
		assert.equal(
			/** @type {HTMLTextAreaElement} */ (elementTextareaWithLeadingNewline.children[0]).value,
			'leading newline'
		);
		assert.equal(
			/** @type {HTMLTextAreaElement} */ (elementTextareaWithLeadingNewline.children[1]).value,
			'  leading newline and spaces'
		);
		assert.equal(
			/** @type {HTMLTextAreaElement} */ (elementTextareaWithLeadingNewline.children[2]).value,
			'\nleading newlines'
		);
		assert.equal(
			/** @type {HTMLTextAreaElement} */ (elementTextareaWithoutLeadingNewline.children[0]).value,
			'without spaces'
		);
		assert.equal(
			/** @type {HTMLTextAreaElement} */ (elementTextareaWithoutLeadingNewline.children[1]).value,
			'  with spaces  '
		);
		assert.equal(
			/** @type {HTMLTextAreaElement} */ (elementTextareaWithoutLeadingNewline.children[2]).value,
			' \nnewline after leading space'
		);
		assert.equal(
			/** @type {HTMLTextAreaElement} */ (elementTextareaWithMultipleLeadingNewline).value,
			'\n\nmultiple leading newlines'
		);
		assert.equal(
			/** @type {HTMLTextAreaElement} */ (
				elementDivWithTextareaWithMultipleLeadingNewline.children[0]
			).value,
			'\n\nmultiple leading newlines'
		);
	}
});
