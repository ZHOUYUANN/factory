<template>
  <div class="component-setting">
    <SettingHeader v-on="$listeners" title="默认Tab设置" />
    <div class="content">
      此模块无需设置，添加可自动放置页面最下方。<br/>
      注：此模块只能放置一个。
    </div>
  </div>
</template>

<script>
import SettingHeader from 'base/views/setting-header'

export default {
  name: 'BTabsCtr',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  },
  components: {
    SettingHeader
  }
}
</script>

<style lang="stylus" scoped>
.component-setting
  .content
    color: #bbbbbb
    font-size: 13px
    line-height: 1.4
</style>