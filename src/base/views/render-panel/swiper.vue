<template>
  <div class="swiper">
    <div v-if="componentData.pictures.length && componentData.pictures[0].src" class="swiper-wrapper">
      <el-carousel height="150px" :autoplay="componentData.autoplay" :interval="componentData.interval * 1000">
        <el-carousel-item 
          v-for="(item, index) in componentData.pictures" 
          :key="index"
          class="swiper-item">
          <img v-if="item.src" class="img" :src="item.src">
          <div v-else class="img-placeholder">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div 
      v-else 
      class="img-placeholder">
      <i class="el-icon-picture-outline"></i>
    </div>
  </div>
  
</template>

<script type="text/ecmascript-6">
export default {
  name: 'BSwiper',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import '~common/stylus/mixin'

.swiper-wrapper
  padding: 12px
  .swiper-item
    width: 100%
    height: 100%
    border-radius: 8px
    .img
      width: 100%
      height: auto 
      display: block
    .img-placeholder
      width: 100%
      height: 100%
      font-size: 24px
      text-align: center
      border-radius: 5px
      box-sizing: border-box
      background-color: #f8f8f8
      color: $color-brand
      flex-center() 
.img-placeholder
  height: 120px
  font-size: 24px
  text-align: center
  color: $color-brand
  background-color: #f8f8f8
  flex-center()
</style>
