<template>
  <div class="holder" :style="componentData.style"></div>
</template>

<script>
export default {
  name: 'BHolder',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.holder
  width: 100%
  height: 20px
  box-sizing: border-box
  opacity: 1
  background-color: #f4f4f4
</style>