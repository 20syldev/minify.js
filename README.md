# @20syldev/minify.js

A minimalist **JavaScript** module to minify any code from **strings**, **files**, or **URLs**.

## Installation

```console
npm install @20syldev/minify.js
```

## Usage

### Import

```js
import { minify, minifyTo } from '@20syldev/minify.js';
```

### Minify a string

```js
const result = await minify(`
    for (let i = 0; i < 10; i++) {
        console.log(i);
    }
`);
console.log(result);
```

### Minify a file

```js
const result = await minify('./file.js');
console.log(result);
```

### Minify a URL

```js
const result = await minify('https://example.com/script.js');
console.log(result);
```

### Minify and save to a file

```js
await minifyTo('./file.js', 'file.min.js');
```

```js
await minifyTo('https://example.com/script.js', 'script.min.js');
```

## Details

- **`minify(input)`**: Minifies JavaScript input (string, file, or URL) and returns a promise containing the minified code.
- **`minifyTo(input, outputFile)`**: Minifies JavaScript and saves the result to a file.