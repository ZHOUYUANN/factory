<template>
  <div class="divider" :style="componentData.style">
    <div class="title">
      <span>{{componentData.text}}</span>  
    </div>
  </div>
</template>

<script>
export default {
  name: 'BDivider',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.divider
  width: 100%
  height: 44px
  line-height: 44px
  box-sizing: border-box
  .title
    height: 44px
    line-height: 44px
    text-align: inherit
    font-size: inherit
    color: inherit
    position: relative
    z-index: 10
    &:before
      content: ''
      position: absolute
      top: 50%
      left: 0
      width: 100%
      height: 1px
      background-color: #DCDFE6
    > span 
      position: relative
      padding: 0 20px
      font-size: inherit
      color: inherit
      margin: 0 10px
      background-color: #ffffff
</style>