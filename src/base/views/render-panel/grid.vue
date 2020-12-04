<template>
  <el-row>
    <el-col 
      class="grid-item"  
      :style="getItemStyle"
      v-for="item in componentData.pictures" 
      :key="item.id">
      <div class="grid-content">
        <img v-if="item.src" class="grid-img" :src="item.src">
        <div v-else class="grid-placeholder">
          <i class="el-icon-picture-outline"></i>
        </div>
        <div class="grid-des">{{item.text}}</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'BGrid',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  },
  computed: {
    getItemStyle() {
      const width = 100 / this.componentData.col
      return {
        width: `${width}%` 
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
  
.grid-item
  margin: 10px 0
  .grid-content
    width: 50px
    margin: 0 auto
    text-align: center
    .grid-img
      width: 50px
      height: 50px
      display: block
    .grid-placeholder
      width: 50px
      height: 50px
      font-size: 24px
      border-radius: 5px
      color: $color-brand
      background-color: #f8f8f8
      flex-center() 
    .grid-des
      margin-top: 10px
</style>