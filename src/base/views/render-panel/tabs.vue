<template>
  <div class="tabs">
    <div class="tabs-con">
      <div class="tabs-conn">
        <div class="tab-item active">新品</div>
        <div class="tab-item">亲子</div>
        <div class="tab-item">夕阳红</div>
        <div class="tab-item">网红打卡</div>
        <div class="tab-item">半自助</div>
        <div class="tab-item">自由行</div>
        <div class="tab-item">游学</div>
        <div class="tab-item">观光</div>
        <div class="tab-item">自驾游</div>
      </div>
    </div>
    <div class="tabs-wrap">
      <el-row :gutter="10">
        <el-col :span="12" class="list-item" v-for="(item, index) in list" :key="index">
          <div class="list-content">
            <div class="list-img">
              <img class="img" :src="item.src">
            </div>
            <div class="list-wrap">
              <div class="list-des">{{item.title}}</div>
              <Price class="list-pri" :price="item.price" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Price from 'base/views/price'

export default {
  name: 'BTabs',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [
        {
          src: 'http://upload.boktour.com/bk_linetype/423/2.JPG',
          title: '【蒙幻之旅●童话世界阿尔山● 私人定制5日】（三晚阿尔山别墅+一晚预备五星+雪村娱乐项目+ 不冻河）童话世界阿尔山、阿尔山森林公园、白狼林俗村、滑雪、温泉双飞5日游',
          price: 3780
        },{
          src: 'http://upload.boktour.com/bk_linetype/20/5.JPG',
          title: '【逍遥游--动车往返】|【经济型酒店】|【解锁厦门】鼓浪屿+沙坡尾+云上厦门+南普陀+环岛路+曾厝垵/双动纯玩3天2晚跟团游',
          price: 1590
        },{
          src: 'http://upload.boktour.com/bk_linetype/20/1.JPG',
          title: '【逍遥游--动车往返】|【豪华型酒店】|【解锁厦门】鼓浪屿+沙坡尾+云上厦门+南普陀+环岛路+曾厝垵/双动纯玩3天2晚跟团游',
          price: 1830
        },{
          src: 'http://upload.boktour.com/bk_linetype/20/6.JPG',
          title: '【逍遥游--动车往返】|【品质型酒店】|【解锁厦门】鼓浪屿+沙坡尾+云上厦门+南普陀+环岛路+曾厝垵/双动纯玩3天2晚跟团游',
          price: 1650
        }
      ]
    }
  },
  components: {
    Price
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.tabs
  .tabs-con
    width: 100%
    height: 44px
    box-sizing: border-box
    display: flex
    padding: 0 10px
    .tabs-conn
      white-space: nowrap
      overflow-y: hidden;
      .tab-item
        line-height: 44px
        display: inline-block
        padding: 0 10px
        font-size: 14px
        position: relative
        &.active
          font-size: 15px
          font-weight: bold
        &.active:before
          content: ''
          position: absolute
          bottom: 3px
          left: 12px
          width: 24px
          height: 3px
          background-color: #0cd7ba
  .tabs-wrap
    padding: 15px 15px 0
    .list-item
      margin-bottom: 15px
      .list-content
        border: 1px solid #ddd
        border-radius: 5px
        .list-img
          width: 100%
          .img
            display: block
            width: 100%
            height: 120px
        .list-wrap
          padding: 10px
          .list-des
            height: 36px
            line-height: 1.2
            font-size: 15px
            ellipsis-line(2)
          .list-pri
            margin-top: 8px
</style>