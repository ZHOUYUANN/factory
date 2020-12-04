<template>
  <el-aside width="320px" :style="controlPanelStyle">
    <component 
      v-if="activeControlPanel" 
      :is="activeControlPanel" 
      :key="activeComponent.id" 
      :componentData="activeComponent"
      v-on:cancel="cancelSelectComponent" />
  </el-aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import setting from 'common/js/component-setting'

export default {
  name: 'BSetting',
  methods: {
    cancelSelectComponent() {
      this.selectComponent('')
    },
    ...mapActions([
      'selectComponent'
    ])
  },
  computed: {
    activeComponent() {
      return this.components.find(c => c.id === this.activeComponentId); 
    },
    activeControlPanel() {
      if (this.activeComponent) {
        let arr = setting.reduce((t, v) => {
          return t.concat(v.items)
        }, [])
        let set = {}
        for(let i = 0; i < arr.length; i++) {
          if(arr[i].type === this.activeComponent.type) {
            set = arr[i]
            break
          }
        }
        return set.controlPanel
      }
      return null;
    },
    controlPanelStyle() {
      const style = {};
      if (!this.activeControlPanel) style.visibility = 'hidden';
      return style;
    },
    ...mapGetters([
      'components',
      'activeComponentId'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.el-aside 
  padding: 0 14px 14px
  background-color: #ffffff
  max-height: 700px
  /deep/.el-form-item__label
          font-size: $font-size-small
  /deep/.el-input--small 
          font-size: $font-size-small
</style>