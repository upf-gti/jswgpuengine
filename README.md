# wgpuEngine Node Package

> [!IMPORTANT]
> Currently in development!

Node package for our newly developed [wgpuEngine](https://github.com/upf-gti/wgpuEngine). Since bindings from the C++ original engine are not completely integrated, this package only provides a simple and work-in-progress interface to start developing some demos and prototypes.

## Installation

Install the package using npm:

```bash
npm install jswgpuengine
```

## Quick start

Add first an import map to shorten paths if needed:

```html
<script type="importmap">
{
    "imports": {
        "@upf-gti/jswgpuengine": "/node_modules/@upf-gti/jswgpuengine/index.js"
    }
}
</script>
```

```js

import { Module } from '@upf-gti/jswgpuengine';

Module.runEngine( () =>  {
    const engine = Module.Engine.instance;
    // ...
} );
```