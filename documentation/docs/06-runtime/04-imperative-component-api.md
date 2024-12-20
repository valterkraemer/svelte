---
title: Imperative component API
---

<!-- better title needed?

- mount
- unmount
- render
- how they interact with each other -->

Every Svelte application starts by imperatively creating a root component. On the client this component is mounted to a specific element.

## `mount`

Instantiates a component and mounts it to the given target:

```js
// @errors: 2322
import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {
	target: document.querySelector('#app'),
	props: { some: 'property' }
});
```

You can mount multiple components per page, and you can also mount from within your application, for example when creating a tooltip component and attaching it to the hovered element.

Note that unlike calling `new App(...)` in Svelte 4, things like effects (including `onMount` callbacks, and action functions) will not run during `mount`. If you need to force pending effects to run (in the context of a test, for example) you can do so with `flushSync()`.

## `unmount`

Unmounts a component that was previously created with [`mount`](#mount).

If `options.outro` is `true`, [transitions](transition) will play before the component is removed from the DOM:

```js
import { mount, unmount } from 'svelte';
import App from './App.svelte';

const app = mount(App, { target: document.body });

// later
unmount(app, { outro: true });
```

Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise.
