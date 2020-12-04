<template>
  <div class="header">
    <div class="img"></div>
    <div class="h-right">
      <i class="iconfont icon-baocun" @click="handleClickSave" alt="121"></i>
      <i class="iconfont icon-yulan" @click="handleClickPreview"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { JSON_DATA } from 'common/js/constants'

export default {
  name: 'bHeader',
  methods: {
    handleClickSave() {
      // 保存到本地
      window.localStorage.setItem(JSON_DATA, 
        JSON.stringify({
          components: this.components
        })
      )
      this.$message.success('保存成功,可在缓存中查看')
    },
    handleClickPreview() {
      this.$emit('preview')
    }
  },
  computed: {
    ...mapGetters([
      'components',
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .header
    width: 100%
    height: 64px
    flex: 0 0 64px
    display: flex
    justify-content: space-between
    align-items: center
    background-color: #ffffff
    border-bottom: 1px solid #eee
    box-shadow: 0px 8px 24px 0px #000a3805
    box-sizing: border-box
    padding: 0 40px
    .img
      display: block
      width: 50px
      height: auto
    .h-right
      .icon-baocun,
      .icon-yulan
        font-size: 24px
        margin-left: 40px
        cursor: pointer
</style>