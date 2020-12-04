import { COMPONENT_TYPE } from 'common/js/config'

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.holder,
  style: {
    backgroundColor: '#f2f3f4',
    height: '12px'
  },
  ...attrs
});
