<template>
  <SlickList
    class="render-area"
    :useDragHandle="true" 
    helperClass="stylizedHelper"
    lockAxis="y" 
    v-model="form"
    appendTo=".render-area"
    @input="changeMove">
      <SlickItem 
        class="render-wrap" 
        v-for="(item, index) in form" 
        :key="item.id" 
        :index="index" 
        :disabled="item.type === tabs">
        <slot name="before-component" :item="item" :index="index" />
        <component 
          :class="{ 
            active: item.type !== 'holder' && 
            item.type !== 'picture' && 
            activeComponentId === item.id 
          }"
          :is="componentTypes[item.type]" 
          :componentData="item"
        />
      </SlickItem>
  </SlickList>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { SlickList, SlickItem } from 'vue-slicksort'
import { copyObj } from 'common/js/util'
import { COMPONENT_TYPE } from 'common/js/config'

import Picture from 'base/views/render-panel/picture'
import Swiper from 'base/views/render-panel/swiper'
import VSwiper from 'base/views/render-panel/vSwiper'
import Text from 'base/views/render-panel/text'
import Grid from 'base/views/render-panel/grid'
import Divider from 'base/views/render-panel/divider'
import VList from 'base/views/render-panel/vList'
import HList from 'base/views/render-panel/hList'
import Holder from 'base/views/render-panel/holder'
import News from 'base/views/render-panel/news'
import Tabs from 'base/views/render-panel/tabs'

export default {
  name: 'BRender',
  props: {
    components: {
      type: Array,
      required: true
    }
  },
  data() {
    let form = copyObj(this.components)
    return {
      form,
      tabs: COMPONENT_TYPE.tabs,
      componentTypes: {
        [COMPONENT_TYPE.picture]: Picture,
        [COMPONENT_TYPE.swiper]: Swiper,
        [COMPONENT_TYPE.verticalSwiper]: VSwiper,
        [COMPONENT_TYPE.text]: Text,
        [COMPONENT_TYPE.grid]: Grid,
        [COMPONENT_TYPE.divider]: Divider,
        [COMPONENT_TYPE.verticalList]: VList,
        [COMPONENT_TYPE.horizontalList]: HList,
        [COMPONENT_TYPE.holder]: Holder,
        [COMPONENT_TYPE.news]: News,
        [COMPONENT_TYPE.tabs]: Tabs
      }
    }
  },
  methods: {
    changeMove(comps) {
      this.setComponent(comps)
    },
    ...mapActions([
      'setComponent'
    ])
  },
  watch: {
    components: {
      handler(comps) {
        this.form = comps
      }
    }
  },
  computed: {
    ...mapGetters([
      'activeComponentId'
    ])
  },
  components: {
    SlickItem,
    SlickList
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.render-wrap
  position: relative
  background-color: #ffffff
  .active
    position: relative
    z-index: 100
</style>