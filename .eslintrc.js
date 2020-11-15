module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    es2017: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "newline-after-var": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".ts",
        ],
      },
    },
  },
  rules: {
    // override airbnb
    "no-console": [
      "off",
      "always"
    ],
    "no-use-before-define": [
      "error",
      { functions: false }
    ],
    "operator-linebreak": [
      "error",
      "before",
      { overrides: { "=": "after" } }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: true }
    ],
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-tabs": "off",

    // prettier rules
    "max-len": [
      "error",
      {
        code: 80,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      },
    ],
    semi: [
      "error",
      "always"
    ],
    "comma-dangle": [
      "error",
      "only-multiline"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    quotes: [
      "error",
      "double"
    ],
    "arrow-parens": [
      "error",
      "always"
    ],
    "linebreak-style": 0,

    // @typescript-eslint  overrides
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescsript-eslint/no-explicit-any": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/ban-ts-ignore": 0,

    "no-undefined": 0,
    complexity: [
      "error",
      10
    ],
    "func-names": 0,
    "class-methods-use-this": 0,

    // tsc already catches these kind of errors
    "no-undef": 0,

    "arrow-body-style": [
      "error",
      "always"
    ],

    indent: [
      "error",
      2,
      { SwitchCase: 1 }
    ],
    "array-bracket-newline": [
      "error",
      { minItems: 2 }
    ],
    "array-element-newline": [
      "error",
      { minItems: 2 }
    ],
    "object-curly-newline": [
      "error",
      {
        /* ObjectExpression: "always",
        ObjectPattern: {multiline: true}, */
        ImportDeclaration: {
          multiline: true,
          minProperties: 2,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 2,
        },
      },
    ],
    "object-property-newline": "error",
  },
};
