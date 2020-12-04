<template>
  <div class="operate">
    <div class="move-bar">
      <i 
        class="iconfont el-icon-top" 
        :class="{ disabled: disabledUp }"
        @click="handleClickMoveUp">
      </i>
      <i 
        class="iconfont el-icon-bottom" 
        :class="{ disabled: disabledDown }"
        @click="handleClickMoveDown">
      </i>
    </div>
    <div class="delete-bar" @click="deleteComponent">
      <i class="iconfont el-icon-delete"></i>
    </div>
    <div v-handle class="handle-bar" :class="{ disabled: disabledDown }">
      <i class="iconfont el-icon-rank"></i>
    </div>
  </div>
</template>

<script>
import { HandleDirective } from 'vue-slicksort'

export default {
  name: 'BOperateBar',
  directives: { handle: HandleDirective },
  props: {
    disabledUp: {
      type: Boolean,
      required: true
    },
    disabledDown: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClickMoveUp() {
      if( this.disabledUp ) return
      this.$emit('move', -1)
    },
    handleClickMoveDown() {
      if( this.disabledDown ) return
      this.$emit('move', 1)
    },
    deleteComponent() {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .operate
    position: absolute
    right: -56px
    width: 36px
    color: #5d6482
    .move-bar
      position: relative
      display: flex
      flex-direction: column
      justify-content: space-around
      height: 90px
      border-radius: 18px
      text-align: center
      background-color: #fff
      box-shadow: 0px 1px 9px 0px rgba(0, 10, 56, 0.06)
      &::before
        content: ''
        position: absolute
        width: 20px
        border-top: 1px solid #ddd
        top: 50%
        left: 50%
        transform: translate(-50%)
      .iconfont
        width: 100%
        padding: 8px 0
        cursor: pointer
        &.disabled
          color: #dddddd
          cursor: not-allowed
    .delete-bar, 
    .handle-bar
      flex-center()
      overflow: hidden
      height: 36px
      margin-top: 8px
      border-radius: 50%
      background-color: #fff
      box-shadow: 0px 1px 9px 0px rgba(0, 10, 56, 0.06)
      cursor: pointer
      transition: all .3s
    .delete-bar
      &:hover
        color: #ffffff
        background-color: $color-danger
    .handle-bar
      cursor: row-resize
      &:hover
        background-color: #dadada
      &.disabled
        color: #dddddd
        cursor: not-allowed
    .iconfont
      font-size: 16px
</style>
