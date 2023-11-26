/** @type {import('@sveltejs/kit').Config} */
const config = {
  // options passed to svelte.compile (https://svelte.dev/docs#compile-time-svelte-compile)
  compilerOptions: {},
 
  // an array of file extensions that should be treated as Svelte components
  extensions: ['.svelte'],
 
  // options passed to @sveltejs/package
  package: {
    source: './',
    dir: 'package',
    exports: (filepath) => filepath === 'index.js',
    files: (filepath) => ['index.js', 'Brim.svelte'].includes(filepath)
  },
 
  // options passed to svelte.preprocess (https://svelte.dev/docs#compile-time-svelte-preprocess)
  preprocess: null
};
 
export default config;