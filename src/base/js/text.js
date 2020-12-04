import { COMPONENT_TYPE } from 'common/js/config'

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.text,
  text: '请输入文本内容',
  style: {
    fontSize: '14px',
    fontWeight: 'normal', // bold
    fontStyle: 'normal', // italic
    textDecoration: 'none', // underline | line-through
    color: '#333',
    textAlign: 'left',
    opacity: 1,
    letterSpacing: '0px',
    lineHeight: 2,
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  ...attrs
});
