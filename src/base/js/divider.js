import { COMPONENT_TYPE } from 'common/js/config'

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.divider,
  text: '分割线',
  style: {
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '14px',
    color: '#333',
    textAlign: 'center',
    letterSpacing: '0px'
  },
  ...attrs
});
