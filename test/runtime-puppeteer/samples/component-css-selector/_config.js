export default {
	html: `
		<div class="svelte-1b1c9yv Child" style="display: contents;">
			<div>
				<p>Child</p>
			</div>
		</div>
	`,
	test({ target, window, assert }) {
		const paragraph = target.querySelector("p");
		assert.htmlEqual(window.getComputedStyle(paragraph).color, "rgb(0, 255, 0)");
	},
};
