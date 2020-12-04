<template>
  <el-form-item :label="label" class="loop">
    <el-input-number 
      size="small"
      v-model="proxyNum" 
      controls-position="right" 
      @change="$emit('change', $event)" 
      :min="min" 
      :max="max"
      :step="step">
    </el-input-number>
  </el-form-item>
</template>

<script>
export default {
  name: 'BInput',
  props: {
    num: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 5
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      proxyNum: this.num
    }
  },
  watch: {
    num: {
      handler(val) {
        this.proxyNum = val
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.loop
  text-align: right 
  margin-bottom: 10px
</style>