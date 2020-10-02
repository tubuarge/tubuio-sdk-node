module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
        mocha: true,
    },
    extends: ['standard', 'prettier', 'prettier/standard'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'prettier/prettier': ['error'],
    },
};