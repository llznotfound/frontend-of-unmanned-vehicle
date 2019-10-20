import * as Redux from 'redux'
import * as DVA from 'dva'
import {message} from 'antd'
import * as coordtransform from 'coordtransform'
import { createAction, Action } from 'redux-actions'

import {PlanState,PREFIX ,NameState,ThemeState} from './index'
import {IP} from '../main'

import * as Request from '../../utils/request'

declare const BMap
const request: any = Request

//向后端请求数据的动作
export function simuDataAction(){
  return createAction(`${PREFIX}/simuData`)()
}

export function *simuData(action: Redux.Action, effects: DVA.EffectsCommandMap){
  const response1:PlanState = yield (() => {
    return request({
      url: `http://${IP}/planstatus/information`
    })
  })()

  const newPosition: {lng:number, lat:number} = yield (() => {
    return changeLocation(response1.lng, response1.lat)
  })()
  yield effects.put(updateDataAction({...response1, lng: newPosition.lng, lat: newPosition.lat}))
}

//向后端请求语音输入坐标点的动作
export function getPositionAction(){
  return createAction(`${PREFIX}/getPosition`)()
}

export function *getPosition(action: Redux.Action, effects: DVA.EffectsCommandMap){
  const response: {status: string, lng?: number, lat?: number} = yield (() => {
    return request({
      url: `http://${IP}/ocean/position`
    })
  })()
  if (response.status == 'ok') {
    yield effects.put(updateWorkingPointAction(response))
    message.success("获取语音输入坐标成功", 3)
  }
}

//更换主题颜色
export function updateThemeAction(payload:string){
  return createAction<string>(`${PREFIX}/updateTheme`)(payload)
}

export function updateTheme(state:ThemeState , action: Action<string>){
  let newState:ThemeState = {...state}
  newState.theme = action.payload==null?'false':action.payload
  return newState;
}

//告知服务器端进入警报模式的动作
export function sendWarningAction(warning: boolean){
  return createAction<boolean>(`${PREFIX}/sendWarning`)(warning)
}

export function *sendWarning(action: Action<boolean>, effects: DVA.EffectsCommandMap){
  const response: {status: string} = yield (() => {
    return request({
      url: `http://${IP}/ocean/warning?warning=${action.payload}`
    })
  })()
  if (action.payload && response.status == 'ok') {
    message.success("向服务端发送警报信息成功", 3)
  }
}

//手机端4个命令
export function sendStartAction(command: number){
  return createAction<number>(`${PREFIX}/sendStart`)(command)
}

export function *sendStart(action: Action<number> , effects: DVA.EffectsCommandMap){
  message.info("命令正在下达 , 请稍候..." , 3)
  const response:  {status:string} = yield (() => {
    return request({
      url:`http://${IP}/ocean/mode_frontend?mode=${action.payload}`
    })
  })()
  // console.log("test")
  // console.log(response)
  // console.log(response)
  // console.log(response.status)
  if(response.status == 'ok'){
    message.success("命令下达成功" , 3)
  } else {
    message.error("命令下发失败",3)
  }
  // message.success("命令下发成功" , 3)
}
export function addPointAction(command: any[]) {
  return createAction<any[]>(`${PREFIX}/sendStart`)(command)
}

export function* addPoint(action: Action<any[]>, effects: DVA.EffectsCommandMap) {
  // message.info("命令正在下达 , 请稍候..." , 3)
  message.info("命令已下达，车辆开始出发", 3)
  const response: { status: string } = yield (() => {
    return request({
      url: `http://${IP}/ocean/mode_frontend?mode=${action.payload}`
    })
  })()
  if (response.status == 'ok') {
    message.success("命令下达成功", 3)
  } else {
    message.error("命令下发失败", 3)
  }
}
//添加新的路径点
/*export function addPointAction(point: any[]) {
  message.info('you are in addPointAction', 3)
  return createAction<any>(`${PREFIX}/addPoint`)(point)
}
export function* addPoint(action: Action<any[]>, effects: DVA.EffectsCommandMap) {
  message.success('success!', 3)
  const response: { status: string } = yield (() => {
    return request({
      url: `http://${IP}/ocean/new_point?point=${action.payload}`
    })
  })()
  if (response.status == 'ok') {
    message.success("路径点添加成功", 3)
  } else {
    message.error("路径点添加失败", 3)
  }
}
*/
function updateDataAction(payload: PlanState) {
  return createAction<PlanState>(`${PREFIX}/updateData`)(payload)
}

//更新节点状态
export function updateData(state: PlanState, action: Action<PlanState>) {
  let newState: PlanState = {...state}
  const payload = action.payload
  // newState.ph = payload.ph + 10 * Math.random()
  newState.ph = payload.ph
  newState.nh3h = payload.nh3h
  // newState.turbidity = payload.turbidity + 100 * Math.random()
  // newState.conductivity = payload.conductivity + 700 * Math.random()
  // newState.oxygen = payload.oxygen + 10 * Math.random()
  newState.turbidity = payload.turbidity 
  newState.conductivity = payload.conductivity 
  newState.oxygen = payload.oxygen 
  //newState.lng = payload.lng
  //newState.lat = payload.lat
  newState.lng = 121.904966
  newState.lat = 30.866581
  // newState.temperature = payload.temperature + 40 * Math.random()
  newState.temperature = payload.temperature
  if (newState.workingPoint.length == 0) {
    newState.workingPoint = [{lng: payload.lng, lat:payload.lat, status:'doing'}]
  }
  return newState
}

export function updateNameAction(payload: NameState) {
  return createAction<NameState>(`${PREFIX}/updateName`)(payload)
}

export function updateName(state: NameState , action:Action<NameState>) {
  let newState :NameState = {...state}
  newState.name = action.payload.toString()
  return newState
}

//更新警告参数
export function updateAlertStationAction(payload:any){
  return createAction<any>(`${PREFIX}/updateAlertStation`)(payload)
}

export function updateAlertStation(state:PlanState , action: Action<any>){
  let newState :PlanState = {...state}
  const payload = action.payload
  newState.alertMode = payload
  newState.alertTime = payload == true?10:30
  // console.log(newState)
  return newState
}

//添加工作路径点
export function updateWorkingPointAction(payload: any) {
  return createAction<any>(`${PREFIX}/updateWorkingPoint`)(payload)
}

export function updateWorkingPoint(state: PlanState, action: Action<any>) {
  let newState: PlanState = {...state}
  const payload = action.payload
  newState.workingPoint = [...state.workingPoint, {lng: payload.lng, lat:payload.lat, status:'todo'}]
  return newState
}

//删除工作路径点
export function deleteWorkingPointAction(payload: any) {
  return createAction<any>(`${PREFIX}/deleteWorkingPoint`)(payload)
}

export function deleteWorkingPoint(state: PlanState, action: Action<any>) {
  let newState: PlanState = {...state}
  const payload = action.payload
  newState.workingPoint = newState.workingPoint.filter((point)=>{
    return !(point.lat < payload.lat+0.00005 && point.lat > payload.lat-0.00005 &&
             point.lng < payload.lng+0.00005 && point.lng > payload.lng-0.00005)
  })
  return newState
}

//GPS坐标转化为百度坐标
function changeLocation(x: number, y: number) {
  return new Promise(resolve=>{
    let ggPoint = new BMap.Point(x, y)
    let convertor = new BMap.Convertor();
    let pointArr = [];
    pointArr.push(ggPoint);
    convertor.translate(pointArr, 1, 5, (data) => {
      if (data.status === 0) {
        resolve({lng:data.points[0].lng, lat:data.points[0].lat})
      }
    })
  })
}

//更新路径信息的动作
/*export function sendRoutesAction(count:number){
  return createAction<{count:Number}>(`${PREFIX}/sendRoutes`)(count)
}

export function *sendRoutes(action: Action<number>, effects: DVA.EffectsCommandMap){
  const GPSPosition = changeLocationArray(action.payload)
  const response: {status: string} = yield (() => {
    let query = `?count=${GPSPosition.length}`
    GPSPosition.forEach((point, i) => {
      query += `&lng${i}=${point.lng.toFixed(6)}&lat${i}=${point.lat.toFixed(6)}`
    })
    return request({
      url: `http://${IP}/ocean/routes${query}`
    })
  })()
  if (response.status == 'ok') {
    message.success("工作路径设置成功", 3)
  } else {
    message.error("工作路径设置失败", 3)
  }
  */
  /*const newPosition: {lng:number, lat:number} = yield (() => {  //测试coordtransform坐标转换效果
    return changeLocation(parseFloat(GPSPosition[1].lng.toFixed(6)), parseFloat(GPSPosition[1].lat.toFixed(6)))
  })()
  yield effects.put(updateWorkingPointAction(newPosition))*/
//}
export function sendRoutesAction(command: number) {
  return createAction<number>(`${PREFIX}/sendStart`)(command)
}

export function* sendRoutes(action: Action<number>, effects: DVA.EffectsCommandMap) {
  // message.info("命令正在下达 , 请稍候..." , 3)
  message.info("正在更新路径...", 3)
  const response: { status: string } = yield (() => {
    return request({
      url: `http://${IP}/ocean/routes?mode=${action.payload}`
    })
  })()
  if (response.status == 'ok') {
    message.success("命令下达成功", 3)
  } else {
    message.error("命令下发失败", 3)
  }
}
//百度坐标转化为GPS坐标(官方没有提供相应转换方式，采用github上的coordtransform库实现)
function changeLocationArray(points: {lng: number, lat: number}[]) {
  return points.map((point) => {
    const gcj02Coord = coordtransform.bd09togcj02(point.lng, point.lat); //百度经纬度坐标转国测局坐标
    const wgs84Coord = coordtransform.gcj02towgs84(gcj02Coord[0], gcj02Coord[1]); //国测局坐标转wgs84坐标
    return {lng: wgs84Coord[0], lat: wgs84Coord[1]}
  })
}

//计算总距离
export function findDistanceAction(points: Array<{lng:number, lat:number, status:string}>) {
  return createAction<Array<{lng:number, lat:number, status:string}>>(`${PREFIX}/findDistance`)(points)
}

export function findDistance(state: PlanState, action: Action<Array<{lng:number, lat:number, status:string}>>) {
  let newState = {...state}
  const points = action.payload
  let distance = [0]
  //let point1:any, point2:any
  let pointArr = points.map((point) => {
    return new BMap.Point(point.lng, point.lat)
  })
  let map = new BMap.Map("map")
  for(let i = 0; i < pointArr.length - 1; i++){
    distance .push(map.getDistance(pointArr[i],pointArr[i+1]))
  }
  newState.totalDistance = distance
  // if (distance > 5000) {
  //   newState.alertMode = true
  // } else {
  //   newState.alertMode = false
  //   newState.alertTime = 30
  // }
  return newState
}

//添加平扫关键点的动作
export function addBoundPointAction(payload: {lng:number, lat:number}){
  return createAction<{lng:number, lat:number}>(`${PREFIX}/addBoundPoint`)(payload)
}

export function addBoundPoint(state: PlanState, action: Action<{lng:number, lat:number}>) {
  let newState = {...state}
  const payload = action.payload
  newState.boundPoint = [...newState.boundPoint, {lng: payload.lng, lat: payload.lat}]
  return newState
}

//计算平扫路径的动作
export function calculateRouteAction(){
  return createAction(`${PREFIX}/calculateRoute`)()
}

export function calculateRoute(state: PlanState) {
  let newState = {...state}
  const boundPoint = state.boundPoint
  boundPoint.sort((pointA, pointB)=>{ //对四个坐标点进行位置排序
    return pointA.lng < pointB.lng? 1: -1
  })
  const [pointNW, pointSW] = boundPoint.slice(0, 2).sort((pointA, pointB)=>{
    return pointA.lat > pointB.lat? 1: -1
  })
  const [pointNE, pointSE] = boundPoint.slice(2).sort((pointA, pointB)=>{
    return pointA.lat > pointB.lat? 1: -1
  })
  const num = 3 //每条边上的扫描点数
  const pointsNorth:{lng:number, lat:number}[] = []
  for (let i=0; i<=num; i++) {
    const lat = (pointNW.lat - pointNE.lat)/num*i + pointNE.lat
    const lng = (pointNW.lng - pointNE.lng)/num*i + pointNE.lng
    pointsNorth.push({lng, lat})
  }
  const pointsSouth:{lng:number, lat:number}[] = []
  for (let j=0; j<=num; j++) {
    const lat = (pointSW.lat - pointSE.lat)/num*j + pointSE.lat
    const lng = (pointSW.lng - pointSE.lng)/num*j + pointSE.lng
    pointsSouth.push({lng, lat})
  }
  for (let k=0; k<=num; k++) {
    newState.workingPoint.push({lng: pointsNorth[k].lng, lat: pointsNorth[k].lat, status:'todo'})
    newState.workingPoint.push({lng: pointsSouth[k].lng, lat: pointsSouth[k].lat, status:'todo'})
  }
  //newState.workingPoint = [...newState.workingPoint] 不立即更新，产生时间差效果
  setTimeout(()=>{
    message.success("路径计算成功！", 3)
  }, 1000)
  return newState
}
