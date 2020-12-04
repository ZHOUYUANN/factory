import { COMPONENT_TYPE } from 'common/js/config'

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.verticalList,
  style: {
    width: 110, 
    height: 80,
    titleFontSize: '16px',
    descFontSize: '12px',
    priceFontSize: '18px'
  },
  pictures: [{
    src: '', 
    url: '', 
    title: '文本',
    desc: '默认文本描述默认文案描述',
    price: 1
  }],
  ...attrs
});
