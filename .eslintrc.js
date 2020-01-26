module.exports = {
  "env": {
    "es6": true,
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    //"plugin:prettier/recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "rules": {
    "@typescript-eslint/array-type": ["error", "array-simple"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/indent": ["error", 2, { "MemberExpression": 1 }],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-empty-interface": ["error", { "allowSingleExtends": true }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-use-before-define": ["error", { "functions": false }],
    "@typescript-eslint/class-name-casing" : "off",
    "@typescript-eslint/camelcase" : "off",
    "@typescript-eslint/no-object-literal-type-assertion" : "off",

    "@typescript-eslint/no-var-requires" : "warning",
  }
};
