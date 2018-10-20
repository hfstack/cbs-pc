// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // 'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "vetur.validation.template": false,
    "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格
    "semi": [2, "always"], //语句强制分号结尾
    // allow async-await
    'generator-star-spacing': 'off',
    // 文件末尾强制换行  
    "eol-last": 0,
    "keyword-spacing ": {
      "overrides": {
        "if": {
          "after": false
        },
        "for": {
          "after": false
        },
        "while": {
          "after": false
        }
      }
    },
    "comma-dangle": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
