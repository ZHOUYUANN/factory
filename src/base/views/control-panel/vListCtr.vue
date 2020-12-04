<template>
  <div class="component-setting">
    <SettingHeader v-on="$listeners" title="纵向列表设置" />
    <div 
      class="uploadImg-wrap" 
      v-for="(picture, index) in form.pictures" 
      :key="index">
      <el-form label-width="80px" label-position="left" size="small">
        <UploadImg 
          :src="picture.src"
          :label="'图片' + (index + 1)"
          @change="handleChangeFile(index, $event)"
          @confirm="handeConfirm(index, $event)" 
        />
        <el-form-item label="链接地址">
          <el-input v-model="picture.url" placeholder="点击图片跳转的地址">
            <el-button slot="append" icon="el-icon-paperclip" size="small" />
          </el-input>
        </el-form-item>
        <el-form-item label="标题文案">
          <el-input v-model="picture.title" placeholder="标题" />
        </el-form-item>
        <el-form-item label="描述文案">
          <el-input v-model="picture.desc" placeholder="描述" />
        </el-form-item>
        <BInput label="价格" :num="picture.price" :max="20000" @change="handleChangePriceInput(index, $event)"/>
      </el-form>
      <UpDown 
        :pictures="form.pictures" 
        :index="index" 
        @upPicture="upPicture"
        @downPicture="downPicture"
        @deletePicture="deletePicture"/>
    </div>
    <el-form size="small">
      <BInput 
        label="图片宽度" 
        :num="form.style.width" 
        :max="160" 
        :min="10"  
        @change="handleChangeInput('width', $event)"/>
      <BInput 
        label="图片高度" 
        :num="form.style.height" 
        :max="160" 
        :min="10"
        @change="handleChangeInput('height', $event)"/>
      <BInput 
        label="标题大小" 
        :num="titleFontSize" 
        :min="10" 
        :max="40"
        @change="handleChangeInput('titleFontSize', $event)"/>
      <BInput 
        label="描述大小" 
        :num="descFontSize" 
        :min="10" 
        :max="40" 
        @change="handleChangeInput('descFontSize', $event)"/>
    </el-form>
    <el-button size="small" round @click="handleChangeFile(-1, $event)">
      <i class="el-icon-plus"></i> 添加图片项
    </el-button>
  </div>
</template>

<script>
import { copyObj, parseUnitNumber } from 'common/js/util'
import BInput from 'base/views/input'
import { upDownMixin} from 'common/js/mixin'

export default {
  mixins: [ upDownMixin ],
  name: 'BVListCtr',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      titleFontSize: parseUnitNumber(copyObj(this.componentData.style.titleFontSize)),
      descFontSize: parseUnitNumber(copyObj(this.componentData.style.descFontSize))
    }
  },
  methods: {
    async handleChangeFile(index, event) {
      let picture = { 
        src: '', 
        title: '文本',
        desc: '默认文本描述默认文案描述',
        price: 0
      }
      if(index < 0) {
        this.form.pictures.push(picture);
      } else {
        const [file] = event.target.files
        if(!file) return

        this.handeConfirm(index, file)
      }
    },
    handleChangePriceInput(index, price) {
      this.form.pictures[index].price = price
    },
    handleChangeInput(type, val) {
      if(type === 'width' || type === 'height') {
        this.form.style[type] = val
      } else {
        this.form.style[type] = `${val}px`
      }
    },
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
    BInput
  }
}
</script>

<style lang="stylus" scoped>
.component-setting
  .uploadImg-wrap
    background: #F9F9F9
    padding: 10px
    margin-bottom: 10px
    .el-form
      .el-form-item
        margin-bottom: 12px
        &:last-child
          margin-bottom: 0
</style>