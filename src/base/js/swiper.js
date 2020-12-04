import { COMPONENT_TYPE } from 'common/js/config'

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.swiper,
  pictures: [{
    url: '', 
    src: ''
  }], // picture => { url: '', src: '' }
  speed: 0.3,
  autoplay: true,
  interval: 2,
  ...attrs,
});
