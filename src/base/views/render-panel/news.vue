<template>
  <div class="news">
    <el-row class="list-row" :gutter="30">
      <el-col 
        :span="12" 
        class="list-item"
        v-for="(picture, index) in componentData.pictures" 
        :key="index">
        <div class="list-content">
          <div class="list-wrap">
            <div class="list-tit" :style="{ fontSize: componentData.style.titleFontSize }">{{picture.title}}</div>
            <div class="list-des" :style="{ fontSize: componentData.style.descFontSize }">{{picture.desc}}</div>
          </div>
          <div class="list-img">
            <img 
              v-if="picture.src" 
              class="img" 
              :src="picture.src" 
              :width="componentData.style.width"
              :height="componentData.style.height"
            />
            <div 
              v-else 
              class="img-placeholder"
              :style="{
                width: componentData.style.width + 'px',
                height: componentData.style.height + 'px'
              }">
              <i class="el-icon-picture-outline"></i>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BNews',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.news
  padding: 10px 0
  .list-row
    padding: 0 15px
    .list-item
      padding: 15px 0
      border-bottom: 1px solid #f1f1f1
      &:nth-child(odd):nth-last-of-type(-n+2)
        border-bottom: none
      &:nth-child(even):nth-last-child(1)
        border-bottom: none
        .list-content
          &:before
            content: none
      &:nth-child(even)
        .list-content
          &:before
            content: none
      .list-content
        display: flex
        position: relative
        &:before
          content: ''
          position: absolute
          top: 0
          right: -15px
          width: 1px
          height: 100%
          background-color: #f1f1f1
        .list-img
          > img 
            display: block
            border-radius: 50%
          .img-placeholder
            font-size: 24px
            text-align: center
            color: $color-brand
            background-color: #f8f8f8
            border-radius: 50%
            flex-center()
        .list-wrap
          flex: 1
          padding-right: 10px
          .list-tit
            line-height: 1.2
            font-size: 14px
            ellipsis-line(1)
          .list-des
            margin-top: 5px
            color: #999999
            font-size: $font-size-small
            line-height: 1.2
            ellipsis-line(2)
</style>