## assignment_value_stale

> Assignment to `%property%` property (%location%) will evaluate to the right-hand side, not the value of `%property%` following the assignment. This may result in unexpected behaviour.

Given a case like this...

```svelte
<script>
	let object = $state({ array: null });

	function add() {
		(object.array ??= []).push(object.array.length);
	}
</script>

<button onclick={add}>add</button>
<p>items: {JSON.stringify(object.items)}</p>
```

...the array being pushed to when the button is first clicked is the `[]` on the right-hand side of the assignment, but the resulting value of `object.array` is an empty state proxy. As a result, the pushed value will be discarded.

You can fix this by separating it into two statements:

```js
let object = { array: [0] };
// ---cut---
function add() {
	object.array ??= [];
	object.array.push(object.array.length);
}
```

## binding_property_non_reactive

> `%binding%` is binding to a non-reactive property

> `%binding%` (%location%) is binding to a non-reactive property

## console_log_state

> Your `console.%method%` contained `$state` proxies. Consider using `$inspect(...)` or `$state.snapshot(...)` instead

When logging a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), browser devtools will log the proxy itself rather than the value it represents. In the case of Svelte, the 'target' of a `$state` proxy might not resemble its current value, which can be confusing.

The easiest way to log a value as it changes over time is to use the [`$inspect`](https://svelte.dev/docs/svelte/$inspect) rune. Alternatively, to log things on a one-off basis (for example, inside an event handler) you can use [`$state.snapshot`](https://svelte.dev/docs/svelte/$state#$state.snapshot) to take a snapshot of the current value.

## event_handler_invalid

> %handler% should be a function. Did you mean to %suggestion%?

## invalid_raw_snippet_render

> The `render` function passed to `createRawSnippet` should return HTML for a single element

## legacy_recursive_reactive_block

> Detected a migrated `$:` reactive block in `%filename%` that both accesses and updates the same reactive value. This may cause recursive updates when converted to an `$effect`.

## lifecycle_double_unmount

> Tried to unmount a component that was not mounted

## ownership_invalid_binding

> %parent% passed a value to %child% with `bind:`, but the value is owned by %owner%. Consider creating a binding between %owner% and %parent%

Consider three components `GrandParent`, `Parent` and `Child`. If you do `<GrandParent bind:value>`, inside `GrandParent` pass on the variable via `<Parent {value} />` (note the missing `bind:`) and then do `<Child bind:value>` inside `Parent`, this warning is thrown.

To fix it, `bind:` to the value instead of just passing a property (i.e. in this example do `<Parent bind:value />`).

## ownership_invalid_mutation

> Mutating a value outside the component that created it is strongly discouraged. Consider passing values to child components with `bind:`, or use a callback instead

> %component% mutated a value owned by %owner%. This is strongly discouraged. Consider passing values to child components with `bind:`, or use a callback instead

Consider the following code:

```svelte
<!--- file: App.svelte --->
<script>
	import Child from './Child.svelte';
	let person = $state({ name: 'Florida', surname: 'Man' });
</script>

<Child {person} />
```

```svelte
<!--- file: Child.svelte --->
<script>
	let { person } = $props();
</script>

<input bind:value={person.name}>
<input bind:value={person.surname}>
```

`Child` is mutating `person` which is owned by `App` without being explicitly "allowed" to do so. This is strongly discouraged since it can create code that is hard to reason about at scale ("who mutated this value?"), hence the warning.

To fix it, either create callback props to communicate changes, or mark `person` as [`$bindable`]($bindable).

## state_proxy_equality_mismatch

> Reactive `$state(...)` proxies and the values they proxy have different identities. Because of this, comparisons with `%operator%` will produce unexpected results

`$state(...)` creates a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) of the value it is passed. The proxy and the value have different identities, meaning equality checks will always return `false`:

```svelte
<script>
	let value = { foo: 'bar' };
	let proxy = $state(value);

	value === proxy; // always false
</script>
```

To resolve this, ensure you're comparing values where both values were created with `$state(...)`, or neither were. Note that `$state.raw(...)` will _not_ create a state proxy.
