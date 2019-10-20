import * as Redux from 'redux'
import * as DVA from 'dva'
import { createAction, Action } from 'redux-actions'

import {RequestResponse} from '../../types/request'
import {DatabaseState,PREFIX} from './index'
import {IP} from '../main/index'
import * as Request from '../../utils/request'

const request: any = Request
interface WorkingState{
//船体工作状态信息
    speed: number//速度
    angle: number//航向角
    communicate:number//通信链路质量
    time:number//完成时间预估
    battery:number//电池
    radius:number//半径警告
}
interface PlanState{//船体计划状态信息
    ph:number //ph值
    conductivity:number //电导率
    turbidity:number //浊度
    oxygen:number //溶氧
    lng: number //船体位置经度
    lat: number //船体位置纬度
    temperature:number//温度
}

//向后端请求数据的动作
export function simuDataAction(){
  return createAction(`${PREFIX}/simuData`)()
}
export function *simuData(action: Redux.Action,effects: DVA.EffectsCommandMap){
  const response1:WorkingState = yield (() => {
    return request({
      url: `http://${IP}/ocean/information`
    })
  })()
  const response2:PlanState = yield (() => {
    return request({
      url: `http://${IP}/planstatus/information`
    })
  })()
  const response:DatabaseState =  yield (() => {
    var response:DatabaseState={
        speed:response1.speed,
        angle: response1.angle,
        communicate:response1.communicate,
        time:response1.time,
        battery:response1.battery,
        radius:response1.radius,
        ph:response2.ph,
        conductivity:response2.conductivity,
        turbidity:response2.turbidity,
        oxygen:response2.oxygen,
        lng: response2.lng,
        lat: response2.lat,
        temperature: response2.temperature
    }
  return response
})()
  yield effects.put(updateDataAction(response))
}
function updateDataAction(payload: DatabaseState) {
  return createAction<DatabaseState>(`${PREFIX}/updateData`)(payload)
}
//更新节点状态
export function updateData(state: DatabaseState, action: Action<DatabaseState>) {
  let newState: DatabaseState = {...state}
  newState.speed = action.payload.speed
  newState.angle = action.payload.angle
  newState.communicate = action.payload.communicate
  newState.time = action.payload.time
  newState.battery = action.payload.battery
  newState.radius = action.payload.radius
  newState.ph = action.payload.ph + Math.random() / 10
  newState.conductivity = action.payload.conductivity + Math.random() / 10
  newState.turbidity = action.payload.turbidity + Math.random() / 10
  newState.oxygen = action.payload.oxygen + Math.random() / 10
  newState.lng = action.payload.lng
  newState.lat = action.payload.lat
  newState.temperature = action.payload.temperature
  return newState
}
