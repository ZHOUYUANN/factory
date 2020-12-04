<template>
  <el-dialog 
    class="preview"
    title="页面预览"
    :close-on-click-modal="false"
    :append-to-body="false"
    :visible="show"
    @close="$emit('closePreview')"
    width="395px">
    <iframe 
      ref="iframe"
      class="iframe"
      :src="PREVIEW_ORIGIN"
      allowtransparency="yes" 
      :style="styleObj">
    </iframe>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { 
  MOBILE_PHONE_WIDTH, 
  MOBILE_PHONE_HEIGHT,
  PREVIEW_ORIGIN 
} from 'common/js/constants'

export default {
  name: 'BPreview',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      PREVIEW_ORIGIN,
      styleObj: {
        width: `${MOBILE_PHONE_WIDTH}px`,
        height: `${MOBILE_PHONE_HEIGHT}px`
      }
    }
  },
  created() {
    window.addEventListener('message', this.onmessage);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.onmessage);
  },
  methods: {
    onmessage(e) {
      const { readyState } = e.data;
      if (readyState === 'loading') {
        this.$refs.iframe.contentWindow.postMessage(
          { components: this.components },
          PREVIEW_ORIGIN
        );
      }
    }
  },
  computed: {
    ...mapGetters([
      'components'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.preview
/deep/.el-dialog
    border-radius: 10px !important
    .el-dialog__body
      padding: 0px 10px 50px 10px !important
      .pre-desc
        position: absolute
        left: 110%
        top: 20%
        width: 180px
        height: 250px
        padding: 10px
        background-color: #fff
        & > p
          margin: 0;
          text-align: left;
          line-height: 1.5;
      .iframe
        display: block
        border: none
        outline: 1px solid #e8e8e8
        overflow: hidden
        border: none
        padding: 0
        background: #f2f3f4
        &::-webkit-scrollbar 
          display: none
</style>