<template>
  <div class="component-setting">
    <SettingHeader v-on="$listeners" title="图片设置"/>
    <div 
      class="uploadImg-wrap"
      v-for="(picture, index) in form.pictures" 
      :key="index">
      <el-form label-width="80px" label-position="left" size="small">
        <UploadImg 
          :src="picture.src"
          label="上传图片"
          @change="handleChangeFile(index, $event)"
          @confirm="handeConfirm(index, $event)"
        />
        <el-form-item label="链接地址">
          <el-input v-model="picture.url" placeholder="点击图片跳转的地址">
            <el-button slot="append" icon="el-icon-paperclip" size="small" />
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getImageWidthAndHeight_Base64, copyObj } from 'common/js/util'
import UploadImg from 'base/views/uploadImg'
import SettingHeader from 'base/views/setting-header'

export default {
  name: 'BPictureCtr',
  props: {
    componentData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: copyObj(this.componentData)
    }
  },
  methods: {
    handleChangeFile(index, event) {
      const [file] = event.target.files
      if(!file) return

      this.handeConfirm(index, file)
    },
    async handeConfirm(index, src) {
      this.$message.success('图片上传成功！')
      let picture = await getImageWidthAndHeight_Base64(src)
      let assignPic = { 
        ...this.form.pictures[index],
        ...picture
      }
      this.form.pictures.splice(index, 1, assignPic);
    },
    ...mapActions([
      'updateActiveComponent'
    ])
  },
  watch: {
    'form.pictures': {
      deep: true,
      handler(pictures) {
        this.updateActiveComponent({
          pictures
        })
      }
    }
  },
  components: {
    UploadImg,
    SettingHeader
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
  
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
