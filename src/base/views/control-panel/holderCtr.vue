<template>
  <div class="component-setting">
    <SettingHeader v-on="$listeners" title="占位高度设置"/>
    <el-form label-width="80px" label-position="left" size="small">
      <BInput label="占位高度" :num="height" :min="1" :max="50" @change="handleChangeInput"/>
      <el-form-item label="背景颜色" class="color-pic">
        <el-color-picker v-model="form.style.backgroundColor" @change="handleChangeColor"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { copyObj, parseUnitNumber } from 'common/js/util'
import BInput from 'base/views/input'
import SettingHeader from 'base/views/setting-header'

export default {
  name: 'BHolderCtr',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: copyObj(this.componentData),
      height: parseUnitNumber(copyObj(this.componentData.style.height)),
    }
  },
  methods: {
    handleChangeInput(height) {
      this.form.style.height = height + 'px'
    },
    handleChangeColor(backgroundColor) {
      this.form.style.backgroundColor = backgroundColor
    },
    ...mapActions([
      'updateActiveComponent'
    ])
  },
  watch: {
    'form.style': {
      deep: true,
      handler(style) {
        this.updateActiveComponent({
          style
        })
      }
    }
  },
  components: {
    BInput,
    SettingHeader
  }
}
</script>

<style lang="stylus" scoped>
.component-setting
  .color-pic
    text-align: right 
</style>