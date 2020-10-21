module.exports = {
  // 环境里定义了一组预定义的全局变量
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  // extends属性表示启用一系列核心规则，若有plugins属性表示同时启用插件的核心规则
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  // 设置解析器
  parser: 'babel-eslint',
  // 解析器选项
  parserOptions: {
    // 表示一些附加特性的对象, 支持JSX
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
    // ECMAScript的版本
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  // 支持使用的第三方插件，在使用插件之前，你必须使用 npm 安装它。
  plugins: ['react'],
  // 规则配置
  rules: {
    indent: 'off',
    'linebreak-style': ['off', 'windows'],
    quotes: ['off', 'single'],
    semi: 0,
    //'react/jsx-indent-props': ['error', 4],
    'react/no-direct-mutation-state': 2,
    'no-console': 0,
    'no-debugger': 2,
    'no-unused-vars': 1,
    'react/prop-types': 0,
    'react/display-name': [0],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
