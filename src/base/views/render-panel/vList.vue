<template>
  <div class="list">
    <div 
      class="list-item" 
      v-for="(picture, index) in componentData.pictures" 
      :key="index"> 
      <div class="list-img" :style="imgStyle">
        <img 
          v-if="picture.src" 
          class="img" 
          :src="picture.src"
          :width="componentData.style.width"
          :height="componentData.style.height"
        />
        <div 
          v-else 
          class="img-placeholder"
          :style="{
            width: componentData.style.width + 'px', 
            height: componentData.style.height + 'px'
          }">
          <i class="el-icon-picture-outline"></i>
        </div>
      </div>
      <div class="list-con">
        <div class="list-wrap">
          <div class="list-tit" :style="{ fontSize: componentData.style.titleFontSize }">{{picture.title}}</div>
          <div class="list-desc" :style="{ fontSize: componentData.style.descFontSize }">{{picture.desc}}</div>
        </div>
        <Price class="list-pri" :priceStyle="componentData.style.priceFontSize" :price="picture.price" />
      </div>
    </div>
  </div>
</template>

<script>
import Price from 'base/views/price'

export default {
  name: 'BVList',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgStyle() {
      return {
        width: this.componentData.style.width + 'px',
        height: this.componentData.style.height + 'px'
      }
    }
  },
  components: {
    Price
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.list
  padding: 15px
  .list-item
    display: flex
    margin-bottom: 10px
    &:last-child
      margin-bottom: 0
    .list-img
      width: 100px
      height: 70px
      overflow: hidden
      .img
        display: block
      .img-placeholder
        width: 100px
        height: 70px
        font-size: 24px
        text-align: center
        border-radius: 5px
        box-sizing: border-box
        background-color: #f8f8f8
        color: $color-brand
        flex-center() 
    .list-con
      flex: 1
      padding-left: 10px
      display: flex
      flex-direction: column
      justify-content: space-between
      .list-wrap
        .list-tit
          font-size: 16px
          color: #333
          padding-top: 5px
          ellipsis-line(1)
        .list-desc
          font-size: $font-size-small
          color: #999
          padding-top: 6px
          line-height: 1.3
          ellipsis-line(2)
      .list-pri
        text-align: right 
</style>