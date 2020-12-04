// 生成一个随机码
export const genRandomCode = () => {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
} 
// 获取图片的原始宽高
export const getImageWidthAndHeight_Base64 = async (file) => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const img = new Image()
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const src = reader.result;
        resolve({
          width,
          height,
          src
        })
      }
      img.src = reader.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const getImageWidthAndHeight = async (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }
    img.src = src
    img.onerror = () => reject;
  })
}

// 浅拷贝
export const copyObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

const toRawType = (v) => toString.call(v).slice(8, -1); 
// 去掉单位中的 px
export const parseUnitNumber = (unit) => {
  if (toRawType(unit) !== 'String') return 0;
  const n = Number(unit.replace(/px/, ''));
  return isNaN(n) ? 0 : n;
};

// 获取当前url后面的参数
export const getUrlParam = (name) => {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
   var r = window.location.search.substr(1).match(reg);
   if (r != null) {
       return unescape(r[2]);
   } else {
       return null;
   }
}

