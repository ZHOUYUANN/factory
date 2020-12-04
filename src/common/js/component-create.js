import { genRandomCode } from 'common/js/util'

const files = require.context('../../base/js', false, /\.js$/)

const config = {};

files.keys().forEach((k) => {
  const defaultFn = files(k).default;

  // 组件配置必须存在 type 属性
  config[defaultFn().type] = defaultFn;
})

export default (type, attrs = {}) => ({
  id: genRandomCode(),
  ...config[type](attrs),
})