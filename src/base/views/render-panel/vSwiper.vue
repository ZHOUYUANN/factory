<template>
  <div class="vSwiper">
    <div class="swiper-con">
      <div class="swiper-item" v-for="(picture, index) in componentData.pictures" :key="index">
        <img v-if="picture.src" class="img" :src="picture.src" />
        <div v-else class="img-placeholder">
          <i class="el-icon-picture-outline"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BVSwiper',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.vSwiper
  padding: 12px
  .swiper-con
    white-space: nowrap
    overflow-y: hidden;
    .swiper-item
      display: inline-block
      width: 320px
      height: 96px
      margin-right: 10px
      .img
        width: 100%
        height: 100%
        display: block
        border-radius: 5px
        box-sizing: border-box
      .img-placeholder
        display: table
        width: 100%
        height: 100%
        font-size: 24px
        text-align: center
        border-radius: 5px
        box-sizing: border-box
        background-color: #f8f8f8
        color: $color-brand
        flex-center() 
</style>