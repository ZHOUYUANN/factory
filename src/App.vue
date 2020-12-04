<template>
  <el-container id="app" direction="vertical">
    <BHeader @preview="showPreview = true" />
    <el-container>
      <BLeft />
      <BMain />
    </el-container>
    <BPreview v-if="showPreview" :show="showPreview" @closePreview="showPreview = false"/>
    <vue-progress-bar />
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'
import { JSON_DATA } from 'common/js/constants'
import BHeader from 'components/header'
import BLeft from 'components/left'
import BMain from 'components/main'
import BPreview from 'components/preview'

export default {
  name: 'App',
  data() {
    return {
      showPreview: false
    }
  },
  mounted() {
    this.getComponents()
  },
  methods: {
    getComponents() {
      // 获取本地记录，刷新显示
      let data = window.localStorage.getItem(JSON_DATA)
      if (data) {
        let { components } = JSON.parse(data)
        this.setDefComponent(components)
      } 
    },
    ...mapActions([
      'setDefComponent'
    ])
  },
  components: {
    BHeader,
    BLeft,
    BMain,
    BPreview
  }
}
</script>

<style lang="stylus" scope>
  #app
    height: 100%
    .el-container
      background-color: #f4f4f4
      overflow: auto
</style>
