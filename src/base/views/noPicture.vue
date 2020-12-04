<template>
  <div class="noPicture">
    <img width="60" height="60" class="default-img" src="../image/picture.png">
  </div>
</template>

<script>
export default {
  name: 'BNopicture'
}
</script>

<style lang="stylus" scoped>
  .noPicture
    width: 100%
    min-height: 140px
    display: flex
    justify-content: center
    align-items: center
    background-color: #f2f6fc
    .default-img
      display: block
</style>