'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
<<<<<<< HEAD
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: ['ember'],
  extends: ['eslint:recommended', 'plugin:ember/recommended'],
=======
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
>>>>>>> fd54f22... v3.6.0-beta.1...v3.24.0
  env: {
    browser: true,
  },
  rules: {},
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
<<<<<<< HEAD
        'fastboot-tests/*.js',
=======
>>>>>>> fd54f22... v3.6.0-beta.1...v3.24.0
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
<<<<<<< HEAD
        'fastboot-tests/fixtures/**',
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015,
=======
      ],
      parserOptions: {
        sourceType: 'script',
>>>>>>> fd54f22... v3.6.0-beta.1...v3.24.0
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
<<<<<<< HEAD
      rules: Object.assign(
        {},
        require('eslint-plugin-node').configs.recommended.rules,
        {
          // add your custom rules and overrides for node files here
        }
      ),
=======
      extends: ['plugin:node/recommended'],
>>>>>>> fd54f22... v3.6.0-beta.1...v3.24.0
    },
  ],
};
