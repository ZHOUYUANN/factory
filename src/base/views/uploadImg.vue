<template>
  <div class="uploadImg">
    <el-form-item :label="label">
      <div class="upload-img">
        <img class="img" v-if="src" :src="src">
        <div v-else>
          <i class="el-icon-upload"></i>
        </div>
        <input 
          class="inp" 
          type="file" 
          accept=".jpeg,.jpg,.png,.gif"
          @change="handlerClick($event)"
        />
      </div>
    </el-form-item>
    <div v-if="link" class="imgPlace" @click="dialogShow=true">外链图片地址</div>
    <el-dialog
      title="图片地址"
      :close-on-click-modal="false"
      :append-to-body="false"
      :visible.sync="dialogShow"
      width="70%">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="网络图片" name="first">
          <div style="height: 502px">
            <el-input placeholder="图片地址，例：https://www.example.com/text.png" v-model="imgUrl"></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="本站图片素材" name="second">
          <el-table
            :data="tableData"
            height="450"
            highlight-current-row
            style="width: 100%">
            <el-table-column type="index" label="#" />
            <el-table-column prop="PicUrl" label="预览" width="80" />
            <el-table-column sortable prop="T_AddTime" label="上传日期" width="100" />
            <el-table-column prop="PicUrl" label="图片地址" />
            <el-table-column align="right">
              <template slot="header">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
              </template>
              <template>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="btn">
        <el-button type="primary" size="small" @click="handlerConfirm">确认</el-button>
        <el-button size="small" @click="dialogShow=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BUploadImg',
  data() {
    return {
      imgUrl: '',
      dialogShow: false,
      activeName: 'first',
      search: '',
      tableData: []   // 获取后台的数据
    }
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    link: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handlerConfirm() {
      if(!this.imgUrl) {
        return this.$message.warning('图片地址不可为空！')
      }
      this.$emit('confirm', this.imgUrl)
      this.dialogShow = false
    },
    handlerClick(event) {
      this.$emit('change', event)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'

.uploadImg
  .el-dialog__body
    padding-top: 10px
  .el-form-item
    margin-bottom: 12px
  .upload-img
    flex-center() 
    position: relative
    box-sizing: border-box
    height: 100px
    border: 1px dashed #ccc
    border-radius: 4px
    background-color: #fff
    cursor: pointer
    &:hover
      border: 1px dashed $color-brand
    .img
      display: block
      width: 100%;
      height: 100%;
      object-fit: contain;
    .el-icon-upload
      font-size: 48px
      color: #C0C4CC
    .inp
      position: absolute
      left: 0
      top: 0
      opacity: 0
      width: 100%
      height: 100%
      cursor: pointer
  .imgPlace
    font-size: 14px
    text-align: right 
    color: $color-brand
    text-decoration: underline
    cursor: pointer
    margin-bottom: 15px
.el-pagination
  margin-top: 20px
  text-align: center
</style>