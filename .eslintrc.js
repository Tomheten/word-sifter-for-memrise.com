module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": "standard",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		"linebreak-style": ["off"],
		"quotes": ["off"],
		"padded-blocks": "off",
		"space-before-blocks": "warn",
		"no-multi-spaces": "off",
		"space-before-function-paren": "off",
		"import/no-duplicates": "warn", // весь импорт из одного файла в одной строке
		// стиль
		"no-console": "warn",
		"eqeqeq": "warn", // ===
		"no-shadow": "error", // https://eslint.org/docs/rules/no-shadow
		"no-multi-assign": "warn", // https://eslint.org/docs/rules/no-multi-assign
		"no-confusing-arrow": "warn", // https://eslint.org/docs/rules/no-confusing-arrow
		// дублирует tslint
		"no-cond-assign": "warn",
		"no-return-assign": "warn",
		"block-spacing": "warn",
		"trailing-comma": "off",
		"object-curly-spacing": "warn",
		// глючит
		"object-curly-even-spacing": "off",
		"indent": "off",
		"semi": "off",
		"no-tabs": "off",
		"no-undef": "off", // не понимает angular modules
		"no-unused-vars": "off",
		"no-multiple-empty-lines": "off",
		"spaced-comment": "off",
		"no-trailing-spaces": "off",
		"comma-dangle": "off",
		"no-useless-constructor": "off",
		'handle-callback-err': 'off',
		"no-dupe-args": 'error',
		"no-dupe-class-members": 'warn',
		"no-dupe-keys": 'error',
		'lines-between-class-members': 'off',
		'eol-last': 'off',
		'comma-spacing': 'warn',
		'prefer-const': 'off',
		'arrow-spacing': 'warn',
		'key-spacing': 'warn',
		'space-in-parens': 'warn',
		'camelcase': 'warn',
		'quote-props':'warn',
		'no-control-regex': 'warn',
		'no-useless-escape': 'warn',
		"dot-notation": "warn",
		"node/no-deprecated-api":"warn",
		"one-var":"warn",
		"keyword-spacing": "warn",
		"object-curly-spacing": "warn",
		"object-curly-newline": "warn",
		"object-property-newline": "warn",
		"array-bracket-spacing": "warn",
		"no-extra-boolean-cast": "warn",
		"no-mixed-operators": "warn",
		"brace-style": "warn",
		"no-control-regex": "off",
		"yoda": "warn",
		"no-new-object": "warn",
		"new-parens": "warn",
		"no-confusing-arrow": "warn",
		"no-case-declarations": "warn",
		"operator-linebreak": "off",
		"import/first": "warn",
		"no-unneeded-ternary":"warn",
        "no-unused-expressions":"off"
	}
};
