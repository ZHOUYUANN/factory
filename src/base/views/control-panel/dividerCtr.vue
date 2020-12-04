<template>
  <div class="component-setting">
    <SettingHeader v-on="$listeners" title="分割线设置" />
    <el-form label-width="80px" label-position="left" size="small">
      <el-form-item label="文案">
        <el-input
          type="text"
          placeholder="请输入文本内容"
          v-model="form.text"
          @change="handleChangeText">
        </el-input>
      </el-form-item>
      <BInput label="字体大小" :num="fontSize" :min="10" :max="40" @change="handleChangeInput('fontSize', $event)"/>
      <BInput label="边距大小" :num="paddingLeft" :min="10" :max="40" @change="handleChangeInput('padding', $event)"/>
      <el-form-item label="字体颜色" class="color-pic">
        <el-color-picker v-model="form.style.color" @change="handleChangeColor"/>
      </el-form-item>
      <el-form-item label="字体样式" class="color-pic">
        <div class="style-wrap">
          <i 
            v-for="(item, index) in textStyle"
            :key="index"
            :class="['iconfont icon-' + item.icon, form.style[item.key] === item.val ? 'active' : '']"
            @click="handleChangeStyle(item)">
          </i>
        </div>
      </el-form-item>
      <BInput label="字间距" :num="1" :min="0" @change="handleChangeInput('letterSpacing', $event)"/>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { copyObj, parseUnitNumber } from 'common/js/util'
import BInput from 'base/views/input'
import SettingHeader from 'base/views/setting-header'

export default {
  name: 'BDividerCtr',
   props: {
    componentData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: copyObj(this.componentData),
      fontSize: parseUnitNumber(copyObj(this.componentData.style.fontSize)),
      paddingLeft: parseUnitNumber(copyObj(this.componentData.style.paddingLeft)),
      textStyle: [
        {
          icon: 'juzuoduiqi',
          key: 'textAlign',
          val: 'left',
          def: 'left'
        }, {
          icon: 'juzhongduiqi',
          key: 'textAlign',
          val: 'center',
          def: 'center'
        }, {
          icon: 'juyouduiqi',
          key: 'textAlign',
          val: 'right',
          def: 'right'
        }
      ]
    }
  },
  methods: {
    handleChangeText() {
      this.updateActiveComponent({
        text: this.form.text
      })
    },
    handleChangeInput(type, val) {
      console.log(val)
      if(type === 'padding') {
        this.form.style['paddingLeft'] = `${val}px`
        this.form.style['paddingRight'] = `${val}px`
      } else {
        this.form.style[type] = `${val}px`
      }
    },
    handleChangeStyle({key, val, def}) {
      const oldVal = this.form.style[key]
      this.form.style[key] = oldVal === val ? def : val
    },
    handleChangeColor(color) {
      this.form.style.color = color
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
@import '~common/stylus/variable'

.component-setting
  .color-pic
    text-align: right 
  .style-wrap
    display: flex
    justify-content: space-around
    align-items: center
    height: 32px
    border: 1px solid #ddd
    font-size: 18px
    border-radius: 4px
    color: #999
    background-color: #fff
    .iconfont
      cursor: pointer
      &.active
        color: $color-brand
</style>