const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['src/cli.js'],
    bundle: true,
    platform: 'node',
    outfile: 'dist/cli.js',
    minify: true,
    treeShaking: true,
    external: [
      // Node.js built-in modules
      'path',
      'fs',
      'fs-extra',
      'inquirer',
    ],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  })
  .catch(() => process.exit(1));
