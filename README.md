# minify.js

Un module **JavaScript** minimaliste pour minifier n'importe quel code à partir de **chaînes** de caractères, de **fichiers** ou d'**URLs**.

## Installation

```console
npm install minify.js
```

## Utilisation

### Importation

```js
import { minify, minifyTo } from 'minify.js';
```

### Minifier une chaîne de caractères

```js
const result = await minify(`
    for (let i = 0; i < 10; i++) {
        console.log(i);
    }
`);
console.log(result);
```

### Minifier un fichier

```js
const result = await minify('./file.js');
console.log(result);
```

### Minifier une URL

```js
const result = await minify('https://example.com/script.js');
console.log(result);
```

### Minifier et sauvegarder dans un fichier

```js
await minifyTo('./file.js', 'file.min.js');
```

```js
await minifyTo('https://example.com/script.js', 'script.min.js');
```

## Détails

- **`minify(input)`** : Minifie du JavaScript en entrée (chaîne, fichier ou URL) et renvoie une promesse contenant le code minifié.
- **`minifyTo(input, outputFile)`** : Minifie le JavaScript et enregistre le résultat dans un fichier.
