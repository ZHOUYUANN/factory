<template>
  <div class="price">
    <span class="pri">￥</span>
    <span class="num" :style="{ fontSize: priceStyle }">{{price}}</span>
    <span class="up">起</span>
  </div>
</template>

<script>
export default {
  name: 'BPrice',
  props: {
    price: {
      type: Number,
      default: 1
    },
    priceStyle: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.price
  font-size: 0
  line-height: 1
  .pri
    color: $color-danger
    font-size: $font-size-small
    margin-right: 2px
    position: relative
    top: -1px
  .num
    color: $color-danger
    font-size: 20px
    margin-right: 2px
    font-weight: bold
  .up
    color: #999999
    font-size: 10px
    position: relative
    top: -1px
</style>