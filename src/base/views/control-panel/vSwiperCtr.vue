<template>
  <div class="component-setting">
    <SettingHeader v-on="$listeners" title="横向滚动设置" />
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
      </el-form>
      <UpDown 
        :pictures="form.pictures" 
        :index="index" 
        @upPicture="upPicture"
        @downPicture="downPicture"
        @deletePicture="deletePicture"/>
    </div>
    <el-button size="small" round @click="handleChangeFile(-1, $event)"><i class="el-icon-plus"></i> 添加图片</el-button>
  </div>
</template>

<script>
import { upDownMixin } from 'common/js/mixin'

export default {
  mixins: [ upDownMixin ],
  name: 'BVSwiperCtr',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  },
  methods: {
    async handleChangeFile(index, event) {
      let picture = { 
        url: '', 
        src: ''
      }
      if(index < 0) {
        this.form.pictures.push(picture);
      } else {
        const [file] = event.target.files
        if(!file) return

        this.handeConfirm(index, file)
      }
    }
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