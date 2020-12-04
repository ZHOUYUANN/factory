import * as types from './mutation-types'
import componentCreate from 'common/js/component-create'
import { COMPONENT_TYPE } from 'common/js/config'
import { genRandomCode } from 'common/js/util'

export const setDefComponent = function ({ commit }, component) {
  // 找到 tabs 的在数组内的索引
  const index = component.findIndex((c) => {
    return c.type === COMPONENT_TYPE.tabs
  })
  // 删除 tabs 组件
  if (index !== -1) {
    component.splice(index, 1)
  }
  // 再重新添加一个新的 tabs 组件
  const comp = componentCreate(COMPONENT_TYPE.tabs, {
    ...JSON.parse(JSON.stringify({}))
  })
  component.push(comp)
  // 提交 action
  commit(types.SET_COMPONENTS, component)
}

export const addComponent = function ({ commit, state }, { type, attrs = {} }) {
  let comps = state.components.slice()

  const index = comps.findIndex((c) => {
    return c.type === COMPONENT_TYPE.tabs
  })
  // 添加如果是 tabs 组件就不作操作
  if (index !== -1 && type === COMPONENT_TYPE.tabs) return

  const comp = componentCreate(type, {
    ...JSON.parse(JSON.stringify(attrs))
  })

  if (index !== -1) {
    // 插入到数组的倒数第二个
    comps.splice(comps.length - 1, 0, comp)
  } else {
    comps.push(comp)
  }

  commit(types.SET_COMPONENTS, comps)
  commit(types.SET_COMPONENT_ID, comp.id)
}

export const moveComponent = function ({ commit, state }, direction) {
  let comps = state.components.slice()
  const index = comps.findIndex((c) => {
    return c.id === state.activeComponentId
  })
  const targetIndex = index + direction;
  const [targetComp] = comps.splice(index, 1)
  comps.splice(targetIndex, 0, targetComp)

  commit(types.SET_COMPONENTS, comps)
}

export const deleteComponent = function ({ commit, state }) {
  let comps = state.components.slice()
  const index = comps.findIndex((c) => {
    return c.id === state.activeComponentId
  })
  comps.splice(index, 1)
  commit(types.SET_COMPONENTS, comps)
}

export const selectComponent = function ({ commit }, id) {
  commit(types.SET_COMPONENT_ID, id)
}

export const updateActiveComponent = function ({ commit, state }, attrs) {
  let comps = state.components.slice()
  const activeComp = comps.find(c => {
    return c.id === state.activeComponentId
  })
  const copyAttrs = JSON.parse(JSON.stringify(attrs))
  Object.assign(activeComp, copyAttrs)

  commit(types.SET_COMPONENTS, comps)
}

export const setDragComponent = function ({ commit, state }, { flag, type = '' }) {
  let comps = state.components.slice()
  let dragComponents = []
  if (flag) {
    if (type === COMPONENT_TYPE.tabs) {
      comps.push({
        id: genRandomCode(),
        type: 'render-holder'
      })
    } else {
      for (let i = 0, len = comps.length; i < len; i++) {
        dragComponents.push(comps.splice(0, 1))
      }
      dragComponents.forEach((item) => {
        if(item[0].type === COMPONENT_TYPE.tabs) return
        item.push({
          id: genRandomCode(),
          type: 'render-holder'
        })
      })
      dragComponents.unshift([{
        id: genRandomCode(),
        type: 'render-holder'
      }])
      // 简单的二维数组扁平
      comps = [].concat.apply([], dragComponents)
    }
  } else {
    for (let j = 0, len = comps.length; j < len; j++) {
      if (comps[j].type !== 'render-holder') {
        dragComponents.push(comps[j])
      }
    }
    comps = dragComponents
  }
  commit(types.SET_COMPONENTS, comps)
}

export const dragAddComponent = function ({ commit, state }, { type, attrs = {}, index }) {
  let comps = state.components.slice()

  const comp = componentCreate(type, {
    ...JSON.parse(JSON.stringify(attrs))
  })
  comps.splice(index, 1, comp)

  let newComps = comps.reduce((t, c) => {
    if (c.type !== 'render-holder') {
      t.push(c)
    }
    return t
  }, [])

  commit(types.SET_COMPONENTS, newComps)
  commit(types.SET_COMPONENT_ID, comp.id)
}

export const setComponent = function({commit}, component) {
  commit(types.SET_COMPONENTS, component)
}