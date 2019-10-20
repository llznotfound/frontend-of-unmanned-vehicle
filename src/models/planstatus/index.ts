import * as Redux from 'redux'
import * as DVA from 'dva'
import { createAction, Action } from 'redux-actions'
import { updateData, getPosition, simuData, sendWarning, sendStart, addPoint, updateWorkingPoint, updateTheme, updateName, deleteWorkingPoint, updateAlertStation, sendRoutes, findDistance, addBoundPoint, calculateRoute } from './planstatus';
import {changeItem, clearItem} from './showItem'
import {changeTime, clearTime, changeAlertTime, clearAlertTime, sendReturn, toggleMode} from './changeTime'
import Communicate from '../../components/main/communicate';
import WorkingPoint from '../../components/main/workingPoint';

export const PREFIX = 'ocean'

export interface PlanState{//船体计划状态信息
  ph:number //ph值
  nh3h:number //氨氮
  turbidity:number //浊度
  conductivity:number //电导率
  oxygen:number //溶氧
  lng: number //船体位置经度
  lat: number //船体位置纬度
  workingPoint: Array<{lng:number, lat:number, status:string}> //工作路径点数
  carworkingPoints:Array<WorkingPoint>
  totalDistance:Array<number>//任务总距离
  alertMode:boolean //是否进入警告模式
  alertTime:number //警告模式30秒倒计时
  mode:boolean //true为连线模式，false为平扫模式
  boundPoint: Array<{lng:number, lat:number}> //平扫模式下的四个边界点，
  temperature:number  //温度
}

export interface ShowItemState{
  item:string //需要显示的信息项
}

export interface TimeState{
  time:number //倒计时
}

export interface NameState{
  name:string//显示的名称
}

export interface ThemeState{
  theme:string  //主题
}


const initState: PlanState & ShowItemState & TimeState & NameState & ThemeState= {
  ph:6.4,//ph值,
  nh3h:3.56,//氨氮
  turbidity:150,//浊度
  conductivity:3.56,//电导率
  oxygen:7.65,//溶氧
  lng: 121.445967,
  lat: 31.032097,
  workingPoint: [],
  totalDistance:[0],
  carworkingPoints:[],
  item:'',//默认不显示
  time:10,
  alertMode: false,
  alertTime: 30,
  mode: true,
  boundPoint: [],
  temperature:28.4,
  name:"ph",
  theme:"false"
}

export default {
  namespace: PREFIX,
  state: initState,
  effects: {
    simuData,
    getPosition,
    sendWarning,
    sendRoutes,
    sendReturn,
    sendStart,
    addPoint
  },
  reducers: {
    updateData,
    changeItem,
    clearItem,
    updateName,
    updateTheme,
    updateWorkingPoint,
    deleteWorkingPoint,
    updateAlertStation,
    changeTime,
    clearTime,
    findDistance,
    changeAlertTime,
    clearAlertTime,
    toggleMode,
    addBoundPoint,
    calculateRoute
  }
}
