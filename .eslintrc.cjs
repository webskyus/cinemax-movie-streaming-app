module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // Enable this for testing but it makes the lint quite slow
        // 'plugin:qwik/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        // Needed when using the qwik plugin
        // project: ['./tsconfig.json'],
    },
    plugins: [
        '@typescript-eslint',
        'no-only-tests',
        // 'qwik'
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'prefer-spread': 'off',
        'no-case-declarations': 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-only-tests/no-only-tests': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        curly: 'error',
        'no-new-func': 'error',
    },
};
