import { COMPONENT_TYPE } from 'common/js/config'

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.news,
  style: {
    width: 50, 
    height: 50,
    titleFontSize: '14px',
    descFontSize: '12px'
  },
  pictures: [{
    src: '', 
    url: '', 
    title: '文本',
    desc: '默认文本描述默认文案描述'
  }],
  ...attrs
});
