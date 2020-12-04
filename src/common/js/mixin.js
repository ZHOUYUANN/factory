import { mapActions } from 'vuex'
import { getImageWidthAndHeight_Base64, copyObj } from 'common/js/util'
import UploadImg from 'base/views/uploadImg'
import SettingHeader from 'base/views/setting-header'
import UpDown from 'base/views/upDown'

export const upDownMixin = {
  data() {
    return {
      form: copyObj(this.componentData)
    }
  },
  methods: {
    async handeConfirm(index, file) {
      this.$message.success('图片上传成功！')
      let picture = await getImageWidthAndHeight_Base64(file)
      let assignPic = { 
        ...this.form.pictures[index],
        ...picture
      }
      this.form.pictures.splice(index, 1, assignPic);
    },
    upPicture(index) {
      const picture = copyObj(this.form.pictures[index])
      this.form.pictures.splice(index, 1)
      this.form.pictures.splice(index - 1, 0, picture)
    },
    downPicture(index) {
      const picture = copyObj(this.form.pictures[index])
      this.form.pictures.splice(index, 1)
      this.form.pictures.splice(index + 1, 0, picture)
    },
    deletePicture(index) {
      this.form.pictures.splice(index, 1)
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
    SettingHeader,
    UpDown
  }
}