import { existsSync, promises } from 'fs';
import http from 'http';
import https from 'https';

export function minify(input) {
    if (!input) return Promise.resolve('[minify.js] Error: Input is empty\n - Usage: minify(<code>), minify(<file>) or minify(<url>)\n - Examples:\n   - minify(\'console.log("Hello, World!")\')\n   - minify(\'./script.js\')\n   - minify(\'https://example.com/script.js\')');
    if (existsSync(input)) return promises.readFile(input, 'utf8').then(code => minifyCode(code));
    if (input.startsWith('http://') || input.startsWith('https://'))
        return new Promise((resolve, reject) => {
            const client = input.startsWith('https://') ? https : http;
            client.get(input, res => {
                if (res.statusCode < 200 || res.statusCode >= 300)
                    return reject(new Error(`HTTP status code: ${res.statusCode}`));
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(minifyCode(data)));
            }).on('error', reject);
        });
    return Promise.resolve(minifyCode(input));
}

function minifyCode(code) {
    return code.replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|\n)\s*\/\/.*$/gm, '$1')
        .replace(/\s+/g, ' ')
        .replace(/\s*([:\{\}\(\)\[\]=<>+\-*\/,;:%])\s*/g, '$1')
        .replace(/(\breturn|\bthrow|\bbreak|\bcontinue)(?=\S)/g, '$1 ')
        .trim();
}

export function minifyTo(input, outputFile) {
    if (!input || !outputFile) return Promise.resolve('[minify.js] Error: Input and output file are required\n - Usage: minifyTo(<code>, <outputFile>), minifyTo(<file>, <outputFile>) or minifyTo(<url>, <outputFile>)\n - Examples:\n   - minifyTo(\'console.log("Hello, World!")\', \'./script.min.js\')\n   - minifyTo(\'./script.js\', \'./script.min.js\')\n   - minifyTo(\'https://example.com/script.js\', \'./script.min.js\')');
    return minify(input).then(result => promises.writeFile(outputFile, result, 'utf8').then(() => result));
}

minify[Symbol.for('nodejs.util.inspect.custom')] = () =>
  'Please use await or .then() to handle the result of minify for URLs.';