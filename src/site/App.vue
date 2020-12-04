<template>
  <div id="app">
    <Render :components="components" />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Render from 'components/render'

export default {
  name: 'App',
  data() {
    return {
      components: [],
    };
  },
  created () {
    this.$Progress.start()
  },
  mounted() {
    this.$Progress.finish()
  },
  components: {
    Render
  }
};
</script>

<style lang="stylus" scoped>

</style>
