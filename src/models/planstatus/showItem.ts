import {createAction, Action} from 'redux-actions'

import {PREFIX, ShowItemState} from './index'

/**
 * 更改显示项的动作
 * @param {string} newItem
 * @returns {any}
 */
export function changeItemAction(newItem: string) {
  return createAction<string>(`${PREFIX}/changeItem`)(newItem)
}

/**
 * 更改显示项
 * @param {ShowItemState} state
 * @param {Action<string>} action
 */
export function changeItem(state: ShowItemState, action: Action<string>) {
  let newState = {...state}
  const newItem = action.payload
  newState.item = newItem
  return newState
}
/**
 * 点击空白选中消失的动作
 * @param {} 
 * @returns {any}
 */
export function clearItemAction() {
  return createAction(`${PREFIX}/clearItem`)()
}

/**
 * 清除显示项
 * @param {GeoNodesState} state
 * @param {Action<null>} action
 */
export function clearItem(state: ShowItemState, action: Action<null>) {
  let newState = {...state}
  newState.item = ''
  return newState
}