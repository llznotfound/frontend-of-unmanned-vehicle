import { createAction } from 'redux-actions'

export const prefix = 'fogWireless';

export type FogWirelessNode = Array<Array<string | number>>

export interface FogWirelessState {
  nodeOne: FogWirelessNode
  nodeTwo: FogWirelessNode
  nodeThree: FogWirelessNode
  nodeFour: FogWirelessNode
}

export function queryNodesDataAction() {
  return createAction(`${prefix}/queryNodesData`)()
}
