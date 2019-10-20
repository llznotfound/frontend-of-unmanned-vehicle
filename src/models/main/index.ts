import * as Redux from 'redux'
import * as DVA from 'dva'
import { createAction, Action } from 'redux-actions'
import {
  updateData,
  simuData,
  sendStart,
  getPosition,
  changeVehicle_No,
  sendBackRoutes,
  sendWarning,
  addPoint,
  sendRoutes,
  updateAllPoint,
  updateRecord,
  updateTran,
  updateSub,
  updateRoad,
  getGpsPosition,
  updateKey,
  updateTheme,
  updateWorkingPoint,
  deleteWorkingPoint,
  updateAlertStation,
  findDistance,
  addBoundPoint,
  calculateRoute,
  sendRelayData,
  changeRelay,
  blink,
  onRelayResponse,
  bottleClicked,
  closeRelayPanel,
  manasLoad,
  plansLoad,
  getWorkingPointAction, getWorkingPoints, getWorkingPoint, getFileList, getAllFiles, updateCarRoute
} from './workingstatus'
// import { getPosition, sendRoutes } from '../planstatus/planstatus';
import {changeItem, clearItem} from '../planstatus/showItem'
import {changeTime, clearTime, changeAlertTime, clearAlertTime, sendReturn, toggleMode} from './changeTime'

export const PREFIX = 'planstatus'
export const IP = "192.168.1.103:8484"//改成rails运行的电脑的ip地址
// export const IP = "192.168.1.117:8484"
// export const IP = "127.0.0.1:8484"

export interface WorkingState{//船体工作状态信息
  fileList: any; // 所有文件
  speed: number//速度
  angle: number//航向角
  communicate:number//通信链路质量
  time:number//完成时间预估
  battery:number//电池
  radius:number//半径警告
  // ph:number //ph值 
  // nh3h:number //氨氮
  // turbidity:number //浊度
  // conductivity:number //电导率
  // oxygen:number //溶氧
  lng: number //船体位置经度  
  lat: number //船体位置纬度
  workingPoint: Array<{lng:number, lat:number, status:string}> //工作路径点数组
  totalDistance:Array<number>//任务总距离
  alertMode:boolean //是否进入警告模式
  alertTime:number //警告模式30秒倒计时
  mode:boolean //true为连线模式，false为平扫模式
  boundPoint: Array<{lng:number, lat:number}> //平扫模式下的四个边界点
  voltage1:number//左电压
  voltage2:number//右电压
  temperature:number  //温度
}

// export interface PlanState{//船体计划状态信息
//   ph:number //ph值
//   nh3h:number //氨氮
//   turbidity:number //浊度
//   conductivity:number //电导率
//   oxygen:number //溶氧
//   lng: number //船体位置经度
//   lat: number //船体位置纬度
//   workingPoint: Array<{lng:number, lat:number, status:string}> //工作路径点数组
//   totalDistance:Array<number>//任务总距离
//   alertMode:boolean //是否进入警告模式
//   alertTime:number //警告模式30秒倒计时
//   mode:boolean //true为连线模式，false为平扫模式
//   boundPoint: Array<{lng:number, lat:number}> //平扫模式下的四个边界点
//   voltage1:number//左电压
//   voltage2:number//右电压
//   temperature:number  //温度
// }

export interface TimeState{
  times:number //倒计时
} 

export interface ManageState { //采样管理信息
  relayState: Array<boolean> //继电器开关状态
  motorMeter: number //电机最大行走距离
  motorAction: string //电机状态
  relayClicked: boolean[]//继电器被点击状态，弹出右侧框
  relayStatus: number[] //继电器数据传送状态，有变化时清除取水瓶闪烁效果，0：default，1：success，2：failure
  volume:number[] //采样容量
  depth:number[] //采样深度
  meter: number//最大行走距离
  mode1:boolean,//

}

export interface ThemeState {
  theme:string//主题
}

export interface PlansState {
  plans:string  //传感器数据是否在读取
}

export interface ManasState {
  mana:string //采样操作是否进行中
}

export interface ChoseState {
  keysmap:string  //地图栏目选中key值
}

export interface SubState {
  gps_lng: number  //差分经度
  gps_lat: number //差分纬度
  gps_heading: number
}

export interface UpdaRoadState{
  upda_road:string  //更新路径操作是否进行中
}

export interface RecordState{
  recordCam:string //是否录像中
}
export interface vehicle_No{
  vehicle_No:string
}

const initState: WorkingState  & TimeState & ManageState & ThemeState & PlansState & ManasState & ChoseState & SubState &UpdaRoadState & RecordState &vehicle_No= {
  fileList: [],
  speed: 0.5,//速度
  angle: 60,//航向角
  communicate:78,//通信链路质量
  time:700,//完成时间预估
  battery:100,//电池
  lng: 121.905597,  //经度
  lat: 30.8666478, //纬度
  radius:9.9,//半径警告,
  voltage1:25.2, //左电压
  voltage2:25.2, //右电压
  // ph:6.4,//ph值,
  // nh3h:3.56,//氨氮
  // turbidity:150,//浊度
  // conductivity:3.56,//电导率
  // oxygen:7.65,//溶氧
  workingPoint: [],
  totalDistance:[0],
  alertMode: false,
  alertTime: 30,
  mode: true,
  boundPoint: [],
  times:10,
  temperature:28.6,
  motorMeter: 0.25,
  motorAction: '2',
  relayState: [false, false, false, false, false, false, false, false],
  relayClicked: [false, false, false, false, false, false, false, false],
  relayStatus: [0, 0, 0, 0, 0, 0, 0, 0],
  volume:[500, 500, 500, 500, 500, 500, 500, 500],
  depth:[50, 50, 50, 50, 50, 50, 50, 50],
  meter:1,
  mode1:false,
  theme:'false',
  mana:'false',
  plans:'true',
  keysmap:'map',
  gps_lng:121.535443069,
  gps_lat:30.523782871,
  gps_heading:220.62399292,
  upda_road:'false',
  recordCam:'false',
  vehicle_No:'A'
}

export default {
  namespace: PREFIX,
  state: initState,
  effects: {
    simuData:simuData,
    getPosition:getPosition,
    getGpsPosition:getGpsPosition,
    sendWarning:sendWarning,
    sendReturn:sendReturn,
    sendStart:sendStart,
    addPoint:addPoint,
    sendRoutes:sendRoutes,
    sendRelayData:sendRelayData,
    updateTran:updateTran,
    sendBackRoutes:sendBackRoutes,
    getFileList: getFileList,
    getWorkingPoints: getWorkingPoints
  },
  reducers: {
    updateData: updateData,
    changeItem:changeItem,
    updateTheme:updateTheme,
    getWorkingPoint: getWorkingPoint,
    getAllFiles: getAllFiles,
    updateCarRoute: updateCarRoute,
    updateWorkingPoint:updateWorkingPoint,
    deleteWorkingPoint:deleteWorkingPoint,
    updateAlertStation:updateAlertStation,
    changeTime:changeItem,
    clearTime:clearItem,
    findDistance:findDistance,
    changeAlertTime:changeAlertTime,
    clearAlertTime:clearAlertTime,
    toggleMode:toggleMode,
    addBoundPoint:addBoundPoint,
    calculateRoute:calculateRoute,
    changeRelay:changeRelay,
    blink:blink,
    onRelayResponse:onRelayResponse,
    bottleClicked:bottleClicked,
    closeRelayPanel:closeRelayPanel,
    plansLoad:plansLoad,
    manasLoad:manasLoad,
    updateKey:updateKey,
    updateSub:updateSub,
    updateRoad:updateRoad,
    updateRecord:updateRecord,
    updateAllPoint:updateAllPoint,
    changeVehicle_No:changeVehicle_No
  }
}
