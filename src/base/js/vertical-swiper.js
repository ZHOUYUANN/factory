import { COMPONENT_TYPE } from 'common/js/config'

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.verticalSwiper,
  pictures: [{
    url: '', 
    src: ''
  },{
    url: '', 
    src: ''
  }], // picture => { url: '', src: '', width: 0, height: 0 }
  ...attrs,
});
