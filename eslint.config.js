import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
      "import-x": importX,
      prettier,
    },
    rules: {
      // ============================================================
      // JAVASCRIPT RULES (Airbnb Standard)
      // ============================================================
      ...js.configs.recommended.rules,

      // Variables
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "prefer-const": "error",
      "no-var": "error",
      "no-undef": "error",

      // ES6+ Features
      "prefer-arrow-callback": "error",
      "no-duplicate-imports": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      radix: "error",
      "no-param-reassign": "error",

      // Best Practices
      eqeqeq: ["error", "always"],
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "error",

      // ============================================================
      // REACT RULES (Airbnb Standard)
      // ============================================================
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Modern React (no React import needed)
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      // Component Definition
      "react/prop-types": "warn", // Airbnb requires PropTypes
      "react/default-props-match-prop-types": "warn",
      "react/require-default-props": "warn",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],

      // JSX Rules
      "react/jsx-props-no-spreading": "warn", // Airbnb discourages spread
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true, // onClick, onSubmit come last
          shorthandFirst: false, // Don't prioritize shorthand props
          shorthandLast: true, // Put shorthand props at end
          multiline: "last", // Multi-line props come last
          ignoreCase: true, // Case-insensitive sorting
          noSortAlphabetically: false, // DO sort alphabetically
          reservedFirst: ["key", "ref"], // Only key and ref can be reserved
          // Result: key, ref, [alphabetical props], [callbacks], [shorthand], [multiline]
        },
      ],
      "react/jsx-pascal-case": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-vars": "error",

      // Component Best Practices
      "react/no-array-index-key": "error", // Airbnb strict rule
      "react/no-danger": "error",
      "react/no-did-mount-set-state": "error",
      "react/no-did-update-set-state": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-multi-comp": "error",
      "react/no-string-refs": "error",
      "react/no-unknown-property": "error",
      "react/prefer-es6-class": "error",
      "react/prefer-stateless-function": "error",
      "react/self-closing-comp": "error",
      "react/button-has-type": "warn",
      "react/no-unescaped-entities": "off", // Allow natural writing in JSX

      // ============================================================
      // ACCESSIBILITY RULES (jsx-a11y)
      // ============================================================
      ...jsxA11y.configs.recommended.rules,

      // Enhanced accessibility rules
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-activedescendant-has-tabindex": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/no-access-key": "error",
      "jsx-a11y/no-autofocus": "error",
      "jsx-a11y/no-distracting-elements": "error",
      "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
      "jsx-a11y/no-noninteractive-element-interactions": "error",
      "jsx-a11y/no-noninteractive-tabindex": "error",
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/scope": "error",
      "jsx-a11y/tabindex-no-positive": "error",

      // ============================================================
      // IMPORT RULES (Airbnb Standard) - SIMPLIFIED FOR PRETTIER
      // ============================================================
      "import-x/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import-x/newline-after-import": "warn",
      "import-x/no-duplicates": "error",
      "import-x/no-unresolved": "error",
      "import-x/no-useless-path-segments": "error",
      "import-x/prefer-default-export": "error",
      "import-x/first": "error",
      "import-x/no-absolute-path": "error",
      "import-x/no-webpack-loader-syntax": "error",

      // ============================================================
      // YOUR PROJECT SPECIFIC RULES
      // ============================================================
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // ============================================================
      // PRETTIER INTEGRATION - MUST BE LAST
      // ============================================================
      ...prettierConfig.rules,
      "prettier/prettier": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import-x/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
];
