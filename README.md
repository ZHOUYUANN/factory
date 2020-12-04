### 前言

因公司需求设计要在小程序首页展示可编辑之后的页面，也就是说在 PC 端实现自给布局设置，然后呈现到小程序首页上。据说是领导看了飞猪后台上产品的页面可以自己布局，然后显示到店铺首页，因为公司的小程序做的也是店铺类性质的，页面也需要给不同人展示的东西也不一样，当然也不能光靠数据操作显示隐藏，最好的办法就是让他们自己编辑布局，选择自己产品的链接，效率高，可适用广。之后给我出的这个项目题，当然是我一个，悲。

如下图：

![飞猪示例图片](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7acc6b6508394a20b1d2f682f43f4fd8~tplv-k3u1fbpfcp-watermark.image)
看到如图的反应是这样的，

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b6a68b2f3c346d3803b5a28d34e39fc~tplv-k3u1fbpfcp-watermark.image" alt="微信图片_20201202172607" style="zoom: 25%;margin: 0 auto" />

悲催的是本人一直都是做小程序为主，很少写网页上的东西，之前也小打闹的写过几个网站，不过那都是用的 JQuery ，放到现在这个项目不是说绝对可行，但也是巨麻烦的，问题是还没什么思路，而且这个肯定用绑定数据的最好，无奈只好得面向百度编程了，找到几个仓库地址，其中下面两个对我的帮助很大，不如说他们的思路和做法很重要，艰难看了一下源码学习，针对这两个我把他们做了一下综合，再加上自己补充的一部分，最后完成。我不是搞程序的，我是代码搬运工...

感谢：

1. https://github.com/yangyuji/h5-factory
2. https://github.com/znlbwo/sandwich

最终经过一段时间的摸爬滚打，勉强的完成了任务，领导开心我也开心。完成效果图如下：

![示例图](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5016815beb3e4974968c7731e358b971~tplv-k3u1fbpfcp-watermark.image)

领导说了页面你就按照飞猪上面的做，我让设计给你做个需要组件的图（就是小程序首页需要展示的图），然后就对着图写了上面的组件，按意思也就是自由发挥，没有考虑做到百分百，但是基本也差不太多了。下面正文：

受慕课黄大师的影响，文件目录如下：

```javascript
|--src
|  +--api // api请求目录
|    |--http.js // 公共的请求方法 axios 封装
|  +--base // 基础组件目录
|    +--image // 基础组件里所用到的图片
|    +--js // 基础组件需要的配置项
|    +--views				
|      +--control-panel // 基础组件的控制面板目录
|      +--render-panel // 基础组件的渲染面板目录
|  +--common // 公共的文件
|    +--fonts // 字体图标
|    +--image // 公共图片
|    +--js // 公共js
|      |--component-create.js // 初始化渲染组件，每次点击左侧面板创建一个渲染组件，并分配一个id
|      |--component-setting.js // 左侧面板组件的配置文件，导出一个 JSON
|      |--config.js // 基础配置
|      |--constants.js // 常量配置
|      |--mixin.js // 组件内公共代码抽离
|      |--util.js // 常用js操作
|    +--stylus					
|  +--components // 页面组件
|  +--plugins // 插件
|  +--site // 预览站点
|  +--store // vuex 
|  App.vue
|  main.js
```

### 技术栈

------

- `Vue.js` ：用于构建用户界面的 MVVM 框架
- `Vue-cli3`：Vue 脚手架工具，快速初始化项目代码
- `Vuex`：实现不同组件间的状态共享
- `Element-ui`：快速构建页面 UI 框架
- `Axios`：一个基于 Promise 的 HTTP 库，向后端发起请求
- `Stylus`：CSS 预处理器
- `iconfont` ：阿里巴巴图标库
- `Qs`：配合 Axios 使用，上传图片保存，请求前处理数据格式
- `vue-slicksort`：渲染组件使用可进行拖拽排序
- `concurrently`：双开服务，可以使用预览服务


### 正文

------

看做出的效果图我们可以把整体分为三个部分，头部，左侧和中间的渲染部分，其中，中间的渲染部分包含组件应该有的配置项，配置项是跟着组件的定位做的，并且我做了左侧可以拖拽到中间的功能和拖拽排序。通过左侧配置的 **JSON** 我可以拿到对应的组件的 **type** ，可以通过 **type** 标识设置渲染内容组件，可以通过 **controlPanel** 设置组件的配置。具体 **JSON** 设计如下：

```json
[
  {
    title: '通用组件',
    collapse: false,
    items: [
      {
        label: '文本',
        controlPanel: TextCtr,			// 组件的配置项
        icon: 'font-size',
        type: COMPONENT_TYPE.text		// 组件名称，前端可通过type类型确定是哪个组件
      }
    ]
  }, 
  {
    title: '轮播组件',
    collapse: true,
    items: [
      {
        label: '轮播图',
        controlPanel: SwiperCtr,
        icon: 'lunbobanner-xuanzemoban',
        type: COMPONENT_TYPE.swiper
      }
    ]
  }
]
```

在 `common/js/component-create.js` 中使用了 webpack 的 require.context 全部导出组件配置文件，等用户点击左侧的选项时，再 commit 提交。[可以在vue文档中查看。](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)

```javascript
import { genRandomCode } from 'common/js/util'
// 获取 base/js 下的所有 js 文件
const files = require.context('../../base/js', false, /\.js$/)

const config = {};

files.keys().forEach((k) => {
  const defaultFn = files(k).default;

  // 组件配置必须存在 type 属性
  config[defaultFn().type] = defaultFn;
})

export default (type, attrs = {}) => ({
  id: genRandomCode(),		// 给每个组件设置一个唯一的id
  ...config[type](attrs),
})
```

#### 拖拽部分实现

左侧拖拽使用的是 H5 的 draggable 属性设置为 true 开启拖拽，监听 dragstart 事件获取组件的 type 类型，

```javascript
<div 
    class="left-item" 
    v-for="item in menu.items" 
    :key="item.label"
    draggable="true"
    @dragstart="dragStart($event, item.type)"
    @dragend="dragEnd"
    @click="handlerComp(item.type)">
    <i :class="'iconfont icon-' + item.icon"></i>
    <div class="tex">{{item.label}}</div>
</div>

{
    methods: {
        dragStart(event, type) {
            // 设置 type ，稍后拖拽 drop 事件结束时取出
            event.dataTransfer.setData('component-type', type)
            this.setDragComponent({
                flag: true, 	// 设置 flage 是为了确定是不是在拖拽中
                type
            })
        },
        dragend() {
            this.setDragComponent({
                flag: false
            })
        }
    }
}
```

中间的拖拽实现是使用了 `vue-slicksort` 库，注意的一点是，slicksort 默认的拖拽文本是添加在 body 后面的，这会导致布局的是错乱，因为我再布局配置项的时候是根据组件定位的 `position: absolute` 布局，再拖动的时候如果是在 body 后面会出现定位找不到，导致错开，所以根据文档把复制的一份添加到定位的下面 `appendTo=".render-area"` 拖动完美。

>注意：使用此模块会导致内部点击事件无效的情况，所以要在特定区域实现拖拽，使用模块给出的 `v-handle` 注册一下指令，另外也要在容器组件加上 **:useDragHandle="true"** ，别漏传了 **:index="index"**

[vue-slicksort](https://github.com/Jexordexan/vue-slicksort)

```javascript
render.vue

<SlickList
    class="render-area"
    :useDragHandle="true" 
    helperClass="stylizedHelper"
    lockAxis="y" 
    v-model="form"
    appendTo=".render-area"
    @input="changeMove">
      <SlickItem 
        class="render-wrap" 
        v-for="(item, index) in form" 
        :key="item.id" 
        :index="index" 
        :disabled="item.type === tabs">
        <slot name="before-component" :item="item" :index="index" />
        <component 
          :class="{ 
            active: item.type !== 'holder' && 
            item.type !== 'picture' && 
            activeComponentId === item.id 
          }"
          :is="componentTypes[item.type]" 
          :componentData="item"
        />
    </SlickItem>
</SlickList>
```



#### 预览实现 

**render** 组件特意拆开写是为了，做预览处理，在 site 文件下重新加了 app.vue 和 main.js ，重启的服务打开不同端口，通过iframe 实现数据传值，window.addEventListener('message') 这里不多赘述，可自行查阅资料。



#### 图片base64处理

通过 H5 的 **FileReader** 接口（当然你不考了ie10以下），[FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 `File` 或 `Blob` 对象指定要读取的文件或数据。

### 最后

感谢大家耐心看完本文！开始做的时候也是有很多犹豫，怕自己不会弄，弄到一半遇到难题什么的，但还是完成的，所以记一下这篇。也是赶鸭子上架，很多不足之处别喷，代码有问题请留言，谢谢。另外附上抽离出来的[源码地址](https://github.com/ZHOUYUANN/factory)。

