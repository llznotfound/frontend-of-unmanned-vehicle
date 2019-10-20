import {createAction} from 'redux-actions'

export const prefix = 'warehouseStatus';

export interface WarehouseStatusState {
  cpus: {
    numbers: number,
    payload: number
  },
  memory: {
    used: number,
    payload: number
  },
  disk: {
    used: number
  }
  database: Array<{
    read: number,
    write: number
  }>,
  line: {
    cpu: Array<Array<number | string>>,
    memory: Array<Array<number | string>>,
    disk: Array<Array<number | string>>
  }
}

// export function queryCpuAction() {
//   return createAction(`${prefix}/queryCPU`)()
// }
//
// export function queryMemoryAction() {
//   return createAction(`${prefix}/queryMemory`)()
// }
//
// export function queryDatabaseAction() {
//   return createAction(`${prefix}/queryDatabase`)()
// }

export function queryStatusAction() {
  return createAction(`${prefix}/queryStatus`)()
}
