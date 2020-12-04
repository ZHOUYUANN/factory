import { COMPONENT_TYPE } from 'common/js/config'

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.grid,
  col: 4, // 最大列数
  pictures: [{
    url: '', 
    src: '', 
    text: '文本'
  }], // picture => { url: '', src: '', text: '' }
  ...attrs
});
