<template>
  <div class="editor">
    <div class="editor-area" :style="editAreaStyle">
      <Render :components="components">
        <template #before-component="{ item, index }" >
          <div 
            v-if="item.type === 'render-holder'"
            class="render-holder"
            @dragover.stop="dragover"
            @dragleave.stop="dragleave"
            @drop.stop="drop"
            @dragover.prevent
            :data-index="index">
          </div>
          <template v-else>
            <OperateBar 
              v-if="activeComponentId === item.id"
              :disabledUp="index | disabledUp(item.type)"
              :disabledDown="index | disabledDown(item.type, components)"
              @move="handleMoveComponent"
              @delete="handleDeleteComponent"/>
            <Setting class="render-setting" v-if="activeComponentId === item.id"/>
            <div 
              class="render-mask" 
              :class="{ active: activeComponentId === item.id }"
              @click="handleSelectComponent(item.id)">
            </div>
          </template>
        </template>
      </Render>
      <div class="first-screen-line">首屏位置</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { MOBILE_PHONE_WIDTH, MOBILE_PHONE_HEIGHT } from 'common/js/constants'
import { COMPONENT_TYPE } from 'common/js/config'
import OperateBar from 'components/operateBar'
import Setting from 'components/setting'
import Render from 'components/render'

export default {
  name: 'BEditorArea',
  data() {
    return {
      editAreaStyle: {
        width: `${MOBILE_PHONE_WIDTH}px`,
        minHeight: `${MOBILE_PHONE_HEIGHT}px`
      }
    }
  },
  methods: {
    handleMoveComponent(direction) {
      this.moveComponent(direction)
    },
    handleDeleteComponent() {
      this.deleteComponent()
    },
    handleSelectComponent(id) {
      if( this.activeComponentId === id ) return
      this.selectComponent(id)
    },
    // 拖拽时进入可拖拽范围内
    dragover(e) {
      const target = e.target
      if (!target.classList.contains('active')) {
        target.classList.add('active')
      }
    },
    // 拖拽时离开可拖拽范围内
    dragleave(e) {
      e.target.classList.remove('active')
    },
    // 拖拽时在拖拽范围内释放
    drop(e) {
      const target = e.target
      target.classList.remove('active')
      const type = e.dataTransfer.getData('component-type')
      const index = parseInt(target.dataset.index)
      this.dragAddComponent({
        type,
        index
      })
    },
    ...mapActions([
      'dragAddComponent',
      'moveComponent',
      'deleteComponent',
      'selectComponent'
    ])
  },
  components: {
    OperateBar,
    Setting,
    Render
  },
  computed: {
    ...mapGetters([
      'components',
      'activeComponentId'
    ])
  },
  filters: {
    disabledUp(index, type) {
      return index === 0 || type === COMPONENT_TYPE.tabs
    },
    disabledDown(index, type, comps) {
      // 如果最后一项是 tabs 组件，则倒数第二项组件不能往下移动
      if(comps[comps.length - 1].type === COMPONENT_TYPE.tabs) {
        return index === comps.length - 1 || index === comps.length - 2
      } else {
        return index === comps.length - 1
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .editor
    position: relative
    .editor-area
      margin: 32px 0
      background-color: #ffffff
      box-shadow: 0px 0px 8px 0px rgba(0, 10, 56, 0.2)
      user-select: none
      position: absolute 
      top: 0
      left: 50%
      margin-left: -375px
      .render-holder
        width: 100%
        height: 60px
        text-align: center
        font-size: 0
        background: #fff
        background-image: linear-gradient(#fff 2px, transparent 0), linear-gradient(90deg, $color-brand 1px, transparent 0)
        background-size: 3px 3px, 3px 3px
        box-sizing: border-box
        position: relative
        &:before
          content: '可将模块放置此区域'
          position: absolute
          top: 50%
          left: 50%
          color: $color-brand
          padding: 8px 14px
          font-size: 14px
          background: #fff
          letter-spacing: 1px
          transform: translate(-50%,-50%)
        &.active:before
          content: '放置模块'
      .render-wrap
        position: relative
        .render-setting
          position: absolute
          right: -400px
          box-shadow: 0px 0px 8px 0px rgba(0,10,56,0.06)
        .render-mask
          position: absolute
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 98
          &.active::before
            content: ''
            position: absolute
            top: 0
            left: 0
            width 100%
            height: 100%
            box-sizing: border-box
            border: 2px solid $color-brand
            z-index: 99
          &:hover::before
            content: ''
            position: absolute
            top: 0
            left: 0
            width 100%
            height: 100%
            box-sizing: border-box
            border: 1px dashed #ccced7
            z-index: 99
          &.active:hover::before
            border: 2px solid $color-brand
      .first-screen-line 
        position: absolute
        top: 585px
        left: -60px
        width: 56px
        padding-top: 6px
        border-top: 1px dashed #ccced7
        font-size: $font-size-small
        color: #999daf
</style>
