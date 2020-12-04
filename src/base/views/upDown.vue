<template>
  <div class="uploadImg-opt" v-if="pictures.length > 1">
    <i v-if="index !== 0" class="icon el-icon-arrow-up" @click="$emit('upPicture', index)"></i>
    <i v-if="index !== pictures.length - 1" class="icon el-icon-arrow-down" @click="$emit('downPicture', index)"></i>
    <i v-if="index > 0" class="icon el-icon-delete" @click="$emit('deletePicture', index)"></i>
  </div>
</template>

<script>
export default {
  name: 'BUpDown',
  props: {
    pictures: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'

.uploadImg-opt
  text-align: right
  margin-top: 12px 
  .icon
    extend-click()
    font-size: 14px
    margin-left: 20px
    color: #999999
    cursor: pointer
    &.el-icon-arrow-up:hover
    &.el-icon-arrow-down:hover
      color: $color-brand
    &.el-icon-delete:hover
      color: $color-danger
</style>