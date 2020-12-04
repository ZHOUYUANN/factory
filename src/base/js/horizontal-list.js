import { COMPONENT_TYPE } from 'common/js/config'

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.horizontalList,
  style: {
    height: 120,
    priceFontSize: '18px'
  },
  pictures: [{
    src: '', 
    title: '这是标题',
    price: 1
  }],
  ...attrs
});
