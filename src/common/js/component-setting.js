import { COMPONENT_TYPE } from 'common/js/config'

import PictureCtr from 'base/views/control-panel/pictureCtr'
import SwiperCtr from 'base/views/control-panel/swiperCtr'
import VSwiperCtr from 'base/views/control-panel/vSwiperCtr'
import TextCtr from 'base/views/control-panel/textCtr'
import GridCtr from 'base/views/control-panel/gridCtr'
import DividerCtr from 'base/views/control-panel/dividerCtr'
import VListCtr from 'base/views/control-panel/vListCtr'
import HListCtr from 'base/views/control-panel/hListCtr'
import HolderCtr from 'base/views/control-panel/holderCtr'
import NewsCtr from 'base/views/control-panel/newsCtr'
import TabsCtr from 'base/views/control-panel/tabsCtr'

export default [
  {
    title: '通用组件',
    collapse: false,
    items: [
      {
        label: '图片',
        controlPanel: PictureCtr,
        icon: 'image',
        type: COMPONENT_TYPE.picture
      },
      {
        label: '文本',
        controlPanel: TextCtr,
        icon: 'font-size',
        type: COMPONENT_TYPE.text
      },
      {
        label: 'Grid 菜单',
        controlPanel: GridCtr,
        icon: 'appstore',
        type: COMPONENT_TYPE.grid
      },
      {
        label: '新产品',
        controlPanel: NewsCtr,
        icon: 'xinwen',
        type: COMPONENT_TYPE.news
      }
    ]
  }, 
  {
    title: '轮播组件',
    collapse: true,
    items: [
      {
        label: '轮播图',
        controlPanel: SwiperCtr,
        icon: 'lunbobanner-xuanzemoban',
        type: COMPONENT_TYPE.swiper
      },
      {
        label: '横向滚动',
        controlPanel: VSwiperCtr,
        icon: 'datuhengxianghuadong1',
        type: COMPONENT_TYPE.verticalSwiper
      }
    ]
  },
  {
    title: '图文组件',
    collapse: true,
    items: [
      {
        label: '纵向-列表',
        controlPanel: VListCtr,
        icon: 'hengxiang',
        type: COMPONENT_TYPE.verticalList
      },
      {
        label: '横向-列表',
        controlPanel: HListCtr,
        icon: 'hengxiang1',
        type: COMPONENT_TYPE.horizontalList
      }
    ]
  },
  {
    title: '辅助组件',
    collapse: true,
    items: [
      {
        label: '分割线',
        controlPanel: DividerCtr,
        icon: 'dash',
        type: COMPONENT_TYPE.divider
      },
      {
        label: '占位高度',
        controlPanel: HolderCtr,
        icon: 'line',
        type: COMPONENT_TYPE.holder
      }
    ]
  },
  {
    title: '其他',
    collapse: true,
    items: [
      {
        label: '默认Tab',
        controlPanel: TabsCtr,
        icon: 'huadongbuju',
        type: COMPONENT_TYPE.tabs
      }
    ]
  }
]
