import * as Redux from 'redux'
import * as DVA from 'dva'
import { createAction, Action } from 'redux-actions'
import {updateData,simuData} from './databasestatus'
import { changeItem } from '../planstatus/showItem';
export const PREFIX = 'databasestatus'

export interface DatabaseState {//采样管理信息
  speed: number//速度
  angle: number//航向角
  communicate:number//通信链路质量
  battery:number//电池
  radius:number//半径警告
  time:number//完成时间预估
  ph:number //ph值
  conductivity:number //电导率
  turbidity:number //浊度
  oxygen:number //溶氧
  lng: number //船体位置经度
  lat: number //船体位置纬度,
  temperature:number  //温度
}

export interface ItemState {
  item:boolean  //显示工作时间
}

const initState: DatabaseState & ItemState= {
  speed: 0.5,//速度
  angle: 60,//航向角
  communicate:78,//通信链路质量
  time:700,//完成时间预估
  battery:100,//电池
  radius:9.9,//半径警告
  ph:6.4,//ph值,
  conductivity:3.56,//电导率
  turbidity:150,//浊度
  oxygen:7.65,//溶氧
  lng: 121.445967,
  lat: 31.032097,
  item: true,
  temperature: 28.3,
}

export default {
  namespace: PREFIX,
  state: initState,
  effects: {
    simuData
  },
  reducers: {
    updateData: updateData,
    changeItem
  }
}
