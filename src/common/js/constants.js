export const MOBILE_PHONE_WIDTH = 375;
export const MOBILE_PHONE_HEIGHT = 585;
export const JSON_DATA = 'JSON_DATA';
// 预览地址
const isProduction = process.env.NODE_ENV === 'production';
export const PREVIEW_ORIGIN = isProduction ? 
  '自己的网站地址目录' : 
  'http://localhost:7002/WebEdit';