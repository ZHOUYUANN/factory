<template>
  <el-form-item :label="label" class="loop">
    <el-switch v-model="proxyValue" @change="$emit('change', $event)"></el-switch>
  </el-form-item>
</template>

<script>
export default {
  name: 'BSwitch',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      proxyValue: this.value
    }
  }
}
</script>

<style lang="stylus" scoped>
.loop
  text-align: right 
  margin-bottom: 10px
</style>