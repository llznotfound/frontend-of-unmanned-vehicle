import * as Redux from 'redux'
import * as DVA from 'dva'
import {createAction, Action} from 'redux-actions'

import * as StatusDef from './statusDef'
import {RequestResponse} from '../../types/request'

import * as Request from '../../utils/request'

const request: any = Request

// interface CPUResponse {
//   data: {
//     numbers: number,
//     payload: number
//   }
// }
//
// interface MemoryResponse {
//   data: {
//     used: number,
//     total: number
//   }
// }
//
// interface DatabaseResponse {
//   data: Array<{
//     read: number,
//     write: number
//   }>
// }

interface StatusResponse {
  data: {
    cpus: {
      numbers: number,
      payload: number
    },
    memory: {
      used: number,
      total: number
    },
    database: Array<{
      read: number,
      write: number
    }>
  }
}

const initState: StatusDef.WarehouseStatusState = {
  cpus: {
    numbers: 256,
    payload: 24
  },
  memory: {
    used: 298,
    payload: 29.10
  },
  disk: {
    used: 8.23
  },
  database: [
    {
      read: 0,
      write: 0
    },
    {
      read: 0,
      write: 0
    },
    {
      read: 0,
      write: 0
    },
    {
      read: 0,
      write: 0
    },
    {
      read: 0,
      write: 0
    }],
  line: {
    cpu: [],
    memory: [],
    disk: []
  }
}

// function *queryCPU(action: Redux.Action, effects: DVA.EffectsCommandMap) {
//   const response: RequestResponse & CPUResponse = yield (() => {
//     return request({
//       url: '/api/v1/warehouse/status/cpus'
//     })
//   })()
//   if (response && 200 == response.statusCode) {
//     const data = response.data
//     yield effects.put(updateCpuAction({data: data}))
//   }
// }
//
// function updateCpuAction(payload: CPUResponse) {
//   return createAction<CPUResponse>(`${StatusDef.prefix}/updateCPU`)(payload)
// }
//
// function updateCPU(state: StatusDef.WarehouseStatusState, action: Action<CPUResponse>) {
//   let newState: StatusDef.WarehouseStatusState = {...state}
//   newState.cpus = {numbers: action.payload.data.numbers, payload: action.payload.data.payload}
//   return newState
// }
//
// function *queryMemory(action: Redux.Action, effects: DVA.EffectsCommandMap) {
//   const response: RequestResponse & MemoryResponse = yield (() => {
//     return request({
//       url: '/api/v1/warehouse/status/memory'
//     })
//   })()
//   if (response && 200 == response.statusCode) {
//     const data = response.data
//     yield effects.put(updateMemoryAction({data: data}))
//   }
// }
//
// function updateMemoryAction(payload: MemoryResponse) {
//   return createAction<MemoryResponse>(`${StatusDef.prefix}/updateMemory`)(payload)
// }
//
// function updateMemory(state: StatusDef.WarehouseStatusState, action: Action<MemoryResponse>) {
//   let newState: StatusDef.WarehouseStatusState = {...state}
//   newState.memory = {used: action.payload.data.used,
//     payload: (action.payload.data.used * 100 / action.payload.data.total).toFixed(2)}
//   return newState
// }
//
// function *queryDatabase(action: Redux.Action, effects: DVA.EffectsCommandMap) {
//   const response: RequestResponse & DatabaseResponse = yield (() => {
//     return request({
//       url: '/api/v1/warehouse/status/database'
//     })
//   })()
//   if (response && 200 == response.statusCode) {
//     const data = response.data
//     yield effects.put(updateDatabaseAction({data: data}))
//   }
// }
//
// function updateDatabaseAction(payload: DatabaseResponse) {
//   return createAction<DatabaseResponse>(`${StatusDef.prefix}/updateDatabase`)(payload)
// }
//
// function updateDatabase(state: StatusDef.WarehouseStatusState, action: Action<DatabaseResponse>) {
//   let newState: StatusDef.WarehouseStatusState = {...state}
//   newState.database = [...action.payload.data]
//   return newState
// }

function* queryStatus(action: Redux.Action, effects: DVA.EffectsCommandMap) {
  const response: RequestResponse & StatusResponse = yield (() => {
    return request({
      url: '/api/v1/warehouse/status/random'
      // url: '/api/v2/warehouse/status/random'
    })
  })()
  if (response && 200 == response.statusCode) {
    const data = response.data
    yield effects.put(updateStatusAction({data: data}))
  }
}

function updateStatusAction(payload: StatusResponse) {
  return createAction<StatusResponse>(`${StatusDef.prefix}/updateStatus`)(payload)
}

function updateStatus(state: StatusDef.WarehouseStatusState, action: Action<StatusResponse>) {
  let newState: StatusDef.WarehouseStatusState = {...state}
  newState.cpus = {...action.payload.data.cpus}
  newState.memory = {
    used: action.payload.data.memory.used,
    payload: (action.payload.data.memory.used * 100 / action.payload.data.memory.total)
  }
  newState.database = [...action.payload.data.database]

  const update = (node: Array<Array<number | string>>, newValue: number): Array<Array<number | string>> => {
    let newNode = [...node]
    const MAX_LEN = 100
    if (newNode.length > MAX_LEN) {
      newNode.shift()
    }
    newNode.push([Date.now(), newValue])
    return newNode
  }
  newState.line.cpu = update(newState.line.cpu, action.payload.data.cpus.payload)
  newState.line.memory = update(newState.line.memory,
    Math.round(10000 *action.payload.data.memory.used / action.payload.data.memory.total) / 100)
  newState.line.disk = update(newState.line.disk, newState.disk.used)
  return newState
}

export = {
  namespace: StatusDef.prefix,
  state: initState,
  effects: {
    // queryCPU: queryCPU,
    // queryMemory: queryMemory,
    // queryDatabase: queryDatabase
    queryStatus: queryStatus
  },
  reducers: {
    // updateCPU: updateCPU,
    // updateMemory: updateMemory,
    // updateDatabase: updateDatabase
    updateStatus: updateStatus
  }
}
