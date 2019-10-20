import * as Redux from 'redux'
import * as DVA from 'dva'
import { createAction, Action } from 'redux-actions'

import * as WirelessDef from './wirelessDef'

import {RequestResponse} from '../../types/request'

import * as Request from '../../utils/request'
import {FogWirelessNode} from "./wirelessDef";
const request: any = Request

interface NodeDataResponse {
  data: {
    payloads: Array<number>
  }
}

const initState: WirelessDef.FogWirelessState = {
  nodeOne: [],
  nodeTwo: [],
  nodeThree: [],
  nodeFour: []
}

function *queryNodesData(action: Redux.Action, effects: DVA.EffectsCommandMap) {
  const response: RequestResponse & NodeDataResponse = yield (() => {
    return request({
      url: '/api/v1/warehouse/wireless/payloads/random'
      // url: '/api/v2/warehouse/wireless/payloads/random'
    })
  })()
  if (response && 200 == response.statusCode) {
    const data = response.data
    yield effects.put(updateNodesDataAction({data: data}))
  }
}

function updateNodesDataAction(payload: NodeDataResponse) {
  return createAction<NodeDataResponse>(`${WirelessDef.prefix}/updateNodesData`)(payload)
}

function updateNodesData(state: WirelessDef.FogWirelessState, action: Action<NodeDataResponse>) {
  let newState: WirelessDef.FogWirelessState = {...state}
  const update = (node: FogWirelessNode, index: number): FogWirelessNode => {
    let newNode = [...node]
    const MAX_LEN = 100
    if (newNode.length > MAX_LEN) {
      newNode.shift()
    }
    newNode.push([Date.now(), action.payload.data.payloads[index]])
    return newNode
  }
  newState.nodeOne = update(newState.nodeOne, 0)
  newState.nodeTwo = update(newState.nodeTwo, 1)
  newState.nodeThree = update(newState.nodeThree, 2)
  newState.nodeFour = update(newState.nodeFour, 3)
  return newState
}

export = {
  namespace: WirelessDef.prefix,
  state: initState,
  effects: {
    queryNodesData: queryNodesData
  },
  reducers: {
    updateNodesData: updateNodesData
  }
}
