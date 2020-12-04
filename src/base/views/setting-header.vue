<template>
  <div class="header">
    <span>{{title}}</span> 
    <i class="el-icon-close" @click="$emit('cancel')"></i>
  </div>
</template>

<script>
export default {
  name: 'BSettingHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.header
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  height: 49px
  line-height: 51px
  font-size: 15px
  margin-bottom: 20px
  background-color: #ffffff
  border-bottom: 1px solid #f2f2f2
  color: #999999
  .el-icon-close
    extend-click()
    cursor: pointer
    transition: all .3s
    &:hover
      color: #333333
</style>