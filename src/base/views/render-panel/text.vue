<template>
  <div class="text" :style="componentData.style">
    {{componentData.text}}
  </div>
</template>

<script>
export default {
  name: 'BText',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.text
  white-space: pre-line
</style>