import { COMPONENT_TYPE } from 'common/js/config'

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.picture,
  pictures: [{
    src: '', 
    url: ''
  }],
  ...attrs,
});
