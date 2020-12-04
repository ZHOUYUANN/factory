<template>
  <div class="hList">
    <el-row :gutter="10">
      <el-col 
        :span="12" 
        class="list-item"
        v-for="(picture, index) in componentData.pictures" 
        :key="index">
        <div class="list-content">
          <div class="list-img">
            <img 
              v-if="picture.src" 
              class="img" 
              :src="picture.src" 
              :height="componentData.style.height"
            />
            <div 
              v-else 
              class="img-placeholder"
              :style="{
                height: componentData.style.height + 'px'
              }">
              <i class="el-icon-picture-outline"></i>
            </div>
          </div>
          <div class="list-wrap">
            <div class="list-des">{{picture.title}}</div>
            <Price class="list-pri" :priceStyle="componentData.style.priceFontSize" :price="picture.price" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Price from 'base/views/price'

export default {
  name: 'BHList',
  props: {
    componentData: {
      type: Object,
      required: true
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

.hList
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
        .img-placeholder
          width: 100%
          height: 120px
          font-size: 24px
          text-align: center
          border-radius: 5px
          box-sizing: border-box
          background-color: #f8f8f8
          color: $color-brand
          flex-center() 
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