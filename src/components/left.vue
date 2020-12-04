<template>
  <el-aside width="290px">
    <div class="left-list" v-for="(menu, index) in setting" :key="index">
      <div class="left-title" @click="menu.collapse = !menu.collapse">
        {{menu.title}}
        <i :class="['iconfont', !menu.collapse ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline']"></i>
      </div>
      <CollapseTransition>
        <div v-show="!menu.collapse" class="left-wrap">
          <div 
            class="left-item" 
            v-for="item in menu.items" 
            :key="item.label"
            draggable="true"
            @dragstart="dragStart($event, item.type)"
            @dragend="dragEnd"
            @click="handlerComp(item.type)">
            <i :class="'iconfont icon-' + item.icon"></i>
            <div class="tex">{{item.label}}</div>
          </div>
        </div>
      </CollapseTransition>
    </div>
  </el-aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { COMPONENT_TYPE } from 'common/js/config'
import setting from 'common/js/component-setting'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

export default {
  name: 'BLeft',
  data() {
    return {
      setting
    }
  },
  methods: {
    handlerComp(type) {
      this.addComponent({
        type
      })
    },
    dragStart(event, type) {
      let comps = this.components.slice()
      const index = comps.findIndex((c) => {
        return c.type === COMPONENT_TYPE.tabs
      })
      // 添加如果是 tabs 组件就不作操作
      if(index !== -1 && type === COMPONENT_TYPE.tabs) return

      event.dataTransfer.setData('component-type', type)
      this.setDragComponent({
        flag: true,
        type
      })
    },
    dragEnd() {
      this.setDragComponent({
        flag: false
      })
    },
    ...mapActions([
      'addComponent',
      'setDragComponent'
    ])
  },
  computed: {
    ...mapGetters([
      'components'
    ])
  },
  components: {
    CollapseTransition
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'

  .el-aside
    height: 100%
    background-color: #ffffff
    box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.1);
    .left-list
      padding: 0 15px
      .left-title
        position: relative
        width: 100%
        height: 48px
        line-height: 48px
        cursor: pointer
        font-size: 14px
        background: #fff
        box-shadow: 15px 0 0 0 #fff, -15px 0 0 0 #fff
        .iconfont
          position: absolute
          right: 0
          top: 18px
          color: #999
      .left-wrap
        width: 240px
        display: flex
        flex-wrap: wrap
        border-top: 2px solid #ffffff
        border-left: 2px solid #ffffff
        .left-item
          flex-center() 
          flex-direction: column
          box-sizing: border-box
          width: 80px
          height: 80px
          border-right: 2px solid #ffffff
          border-bottom: 2px solid #ffffff
          font-size: 14px
          color: #5d6482
          background-color: #f7f7f7
          cursor: pointer
          transition: all .3s
          &:hover
            background-color: #eeeeee
          .iconfont
            font-size: 24px
            margin-bottom: 4px
            transition: all .3s
          &:hover .iconfont
            transform: translateY(-2px);
</style>