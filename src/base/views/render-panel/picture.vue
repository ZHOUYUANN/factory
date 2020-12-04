<template>
  <div class="picture">
    <div class="prictrue-wrap" v-for="(picture, index) in componentData.pictures" :key="index">
      <img 
        v-if="picture.src" 
        class="picture-img" 
        :src="picture.src"  />
      <div 
        v-else 
        class="img-placeholder">
        <i class="el-icon-picture-outline"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BPicture',
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

.picture
  width: 100%
  box-sizing: border-box
  .picture-img
    display: block
    width: 100%
    height: auto
  .img-placeholder
    height: 120px
    font-size: 24px
    text-align: center
    color: $color-brand
    background-color: #f8f8f8
    flex-center()
</style>