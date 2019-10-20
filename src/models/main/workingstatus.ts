import * as Redux from 'redux'
import * as DVA from 'dva'
import { createAction, Action } from 'redux-actions'

import {RequestResponse} from '../../types/request'
import {WorkingState,PREFIX,IP,ManageState,ThemeState,PlansState,ManasState,ChoseState,SubState,UpdaRoadState,RecordState, vehicle_No} from './index'
import * as coordtransform from 'coordtransform'
import {Map} from 'react-bmap'
import {message} from 'antd'

import * as Request from '../../utils/request'
import Pointer from '../../components/main/pointer';

const request: any = Request
declare const BMap: any

export interface ResponseState {//返回信息
  status: string
}
export interface MotorState {// 电机信息
  meter: number,//最大行走距离
  motor: string//电机状态

}
export interface RelayState {// 继电器信息
  relayState: boolean[] //继电器开关状态
  num: number// 继电器编号
}

// 继电器反馈状态信息
interface RelayResponse {
  num: number
  status: number
}

let count = 0;
//向后端请求数据的动作
export function simuDataAction(){
  return createAction(`${PREFIX}/simuData`)()
}
export function *simuData(action: Redux.Action,effects: DVA.EffectsCommandMap){
  yield effects.put(plansLoadAction('true'))
  const response:WorkingState = yield (() => {
    /*var working:WorkingState={
      speed: Math.ceil(Math.random()*100),
      angle: Math.ceil(Math.random()*100),
      communicate:-80+Math.ceil(-Math.random()*4+2),
      time:(700-count*3)>0?(700-count*3):0, //  暂时没有考虑更改路径增加时间
      battery:Math.ceil(Math.random()*100),
      radius:Math.ceil(Math.random()*100)/10,
    }
    count++
  return working  */
    return request({
      url: `http://${IP}/ocean/all`
    })
  })()
  // const response1:PlanState = yield (() => {
  //   return request({
  //     url: `http://${IP}/planstatus/information`
  //   })
  // })()
  const newPosition: {lng:number, lat:number} = yield (() => {
    return changeLocation(response.lng, response.lat)
  })()
  yield effects.put(plansLoadAction('false'))
  yield effects.put(updateDataAction({...response,lng: newPosition.lng, lat: newPosition.lat}))
  // yield effects.put(updatePlanStateAction({...response,lng: newPosition.lng, lat: newPosition.lat}))
}
function updateDataAction(payload: WorkingState) {
  return createAction<WorkingState>(`${PREFIX}/updateData`)(payload)
}
//更新节点状态
export function updateData(state: WorkingState, action: Action<WorkingState>) {
  let newState: WorkingState = {...state}
  newState.speed = action.payload.speed
  newState.angle = action.payload.angle
  // console.log('test')
  // newState.communicate = this.getCommunicate()
  newState.communicate = action.payload.communicate
  newState.time = action.payload.time
  newState.battery = action.payload.battery
  // newState.radius = action.payload.radius + Math.random() / 100
  // newState.radius = this.getRadius()
  newState.radius = action.payload.radius
  newState.voltage1 = action.payload.voltage1
  newState.voltage2 = action.payload.voltage2
  //newState.ph = action.payload.ph
  // newState.nh3h = action.payload.nh3h
  //newState.turbidity = action.payload.turbidity
  //newState.conductivity = action.payload.conductivity
  //newState.oxygen = action.payload.oxygen
  newState.lng = action.payload.lng
  console.log(newState.lng)
  newState.lat = action.payload.lat
  //newState.lng = 124.904966
  // newState.lat = 30.866581
  //newState.temperature = action.payload.temperature
  if (newState.workingPoint.length == 0 || newState.workingPoint.length == 1) {
    //newState.workingPoint = [{lng: action.payload.lng, lat:action.payload.lat, status:'doing'}]
    newState.workingPoint = [{lng: 121.904966, lat:30.866581, status:'doing'}]
  }
  return newState
}

// function updatePlanStateAction(payload: PlanState){
//   return createAction<PlanState>(`${PREFIX}/updatePlanState`)(payload)
// }

// export function updatePlanState(state: PlanState , action: Action<PlanState>){
//   let newState:PlanState = {...state}
//   newState.voltage1 = action.payload.voltage1
//   newState.voltage2 = action.payload.voltage2
//   newState.ph = action.payload.ph
//   newState.nh3h = action.payload.nh3h
//   newState.turbidity = action.payload.turbidity
//   newState.conductivity = action.payload.conductivity
//   newState.oxygen = action.payload.oxygen
//   newState.lng = action.payload.lng
//   newState.lat = action.payload.lat
//   newState.temperature = action.payload.temperature
//   if (newState.workingPoint.length == 0) {
//     newState.workingPoint = [{lng: action.payload.lng, lat:action.payload.lat, status:'doing'}]
//   }
//   return newState
// }

//更换主题颜色
export function updateThemeAction(payload:string){
  return createAction<string>(`${PREFIX}/updateTheme`)(payload)
}

export function updateTheme(state:ThemeState , action: Action<string>){
  let newState:ThemeState = {...state}
  newState.theme = action.payload == null ? 'false':action.payload
  return newState;
}
//更改操控车辆
export function changeVehicle_NoAction(payload:string){
  return createAction<string>(`${PREFIX}/changeVehicle_No`)(payload)
}

export function changeVehicle_No(state:vehicle_No, action:Action<string>){
  let newState:vehicle_No={...state}
  newState.vehicle_No=action.payload == null ? 'false':action.payload
  return newState;
}
//更换地图栏目显示内容
export function updateKeys(payload:string){
  return createAction<string>(`${PREFIX}/updateKey`)(payload)
}

export function updateKey(state:ChoseState , action:Action<string>){
  let newState:ChoseState = {...state}
  newState.keysmap = action.payload
  return newState
}

//模拟传感器读取占线
export function plansLoadAction(payload:string){
  return createAction<string>(`${PREFIX}/plansLoad`)(payload)
}

export function plansLoad(state:PlansState , action:Action<string>){
  let newState:PlansState = {...state}
  newState.plans = action.payload
  return newState
}

//模拟采样操作占线
export function manasLoadAction(payload:string){
  return createAction<string>(`${PREFIX}/manasLoad`)(payload)
}

export function manasLoad(state:ManasState , action:Action<string>){
  let newState:ManasState = {...state}
  newState.mana = action.payload;
  return newState
}

//模拟更新路径占线
export function updateRoadAction(payload:string){
  return createAction<string>(`${PREFIX}/updateRoad`)(payload)
}

export function updateRoad(state:UpdaRoadState , action:Action<string>){
  let newState:UpdaRoadState = {...state}
  newState.upda_road = action.payload
  return newState
}

//更改录像状态
export function updateRecordAction(payload:string){
  return createAction<string>(`${PREFIX}/updateRecord`)(payload)
}

export function updateRecord(state:RecordState , action:Action<string>){
  let newState:RecordState = {...state}
  newState.recordCam = action.payload
  return newState
}

//更新差分gps信息
export function updateSubAction(payload:SubState){
  return createAction<SubState>(`${PREFIX}/updateSub`)(payload)
}

export function updateSub(state:SubState , action:Action<SubState>){
  let newState:SubState = {...state}
  newState.gps_lat = action.payload.gps_lat
  newState.gps_heading = action.payload.gps_heading
  newState.gps_lng = action.payload.gps_lng
  return newState
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

//向后端请求语音输入坐标点的动作
export function getWorkingPointsAction(payload){
  return createAction<any>(`${PREFIX}/getWorkingPoints`)(payload)
}

export function *getWorkingPoints(action: Action<any>, effects: DVA.EffectsCommandMap){
  console.log(action)
  const response: {status: string, lng?: number, lat?: number} = yield (() => {
    return request({
      url: `http://${IP}/ocean/get_routes?car=${action.payload.car}&file_name=${action.payload.file_name}`
    })
  })()
  if (response.status == 'ok') {
    console.log(response)
    yield effects.put(getWorkingPointAction(response))
    message.success("获取数据成功", 3)
  }
}


//向后端请求语音输入坐标点的动作
export function getFileListAction(car){
  return createAction<String>(`${PREFIX}/getFileList`)(car)
}

export function *getFileList(action: Action<String>, effects: DVA.EffectsCommandMap){
  const response: any = yield (() => {
    return request({
      url: `http://${IP}/ocean/get_csv_files?car=${action.payload}`
    })
  })()
  if (response.status == 'ok') {
    const newResponse: any = yield (() => {
      return request({
        url: `http://${IP}/ocean/get_routes?car=${action.payload}&file_name=${response.file_list[0]}`
      })
    })()
    message.success("获取数据成功", 3)
    if (newResponse.status == 'ok') {
      yield effects.put(updateCarRouteAction({routes: newResponse.routes, file_list: response.file_list}))
      message.success("获取文件成功", 3)
    }
  }
}


//获取差分坐标
export function getGpsPositionAction(){
  return createAction(`${PREFIX}/getGpsPosition`)()
}

export function *getGpsPosition(action:Redux.Action , effects: DVA.EffectsCommandMap){
  const response:SubState = yield (() => {
    return request({
      url:`http://${IP}/ocean/gps`
    })
  })()
  yield effects.put(updateSubAction(response))
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
  // message.info("命令正在下达 , 请稍候..." , 3)
  message.info("命令已下达，车辆开始出发" , 3)
  const response:  {status:string} = yield (() => {
    return request({
      url:`http://${IP}/ocean/mode_frontend?mode=${action.payload}`
    })
  })()
  if(response.status == 'ok'){
    message.success("命令下达成功" , 3)  
  } else {
    message.error("命令下发失败",3)
  }
}
export function addPointAction(point:any[]) {
  return createAction<any[]>(`${PREFIX}/addPoint`)(point)
}

export function* addPoint(action: Action<any[]>, effects: DVA.EffectsCommandMap) {
  message.info("正在添加当前路径点...", 3)
  console.log(action.payload)
  const response: { status: string } = yield (() => {
    return request({
      url: `http://${IP}/ocean/new_point?lat=${action.payload[0]}&lng=${action.payload[1]}`
    })
  })()
  if (response.status == 'ok') {
    message.success("路径点添加成功", 3)
  } else {
    message.error("路径点添加失败", 3)
  }
}
  // message.success("命令下发成功" , 3)

//添加路径点
/*export function addPointAction(point:any[]){
  message.info('you are in addPointAction', 3)
  return createAction<any[]>(`${PREFIX}/addPoint`)(point)
}
export function *addPoint(action: Action<any[]>, effects: DVA.EffectsCommandMap){
  message.success('success!', 3)
  const response: { status: string } = yield(() => {
    return request({
      url: `http://${IP}/ocean/new_point?point=${action.payload}`
    })
  })()
  if (response.status == 'ok') {
    message.success("路径点添加成功", 3)
  } else {
    message.error("路径点添加失败", 3)
  }
}*/
//更新警告参数
export function updateAlertStationAction(payload:any){
  return createAction<any>(`${PREFIX}/updateAlertStation`)(payload)
}

export function updateAlertStation(state:WorkingState , action: Action<any>){
  let newState :WorkingState = {...state}
  const payload = action.payload
  newState.alertMode = payload
  newState.alertTime = payload == true?10:30
  return newState
}

//对输入的经纬度进行转换
export function updateTranAction(payload:any){
  return createAction<any>(`${PREFIX}/updateTran`)(payload)
}

export function *updateTran(action:Action<any>,effects: DVA.EffectsCommandMap){
  const payload = action.payload
  const newPosition: {lng:number, lat:number} = yield (() => {
    return changeLocation(payload.lng, payload.lat)
  })()
  yield effects.put(updateWorkingPointAction(newPosition))
}

//获取全部文件
export function updateCarRouteAction(payload: any) {
  return createAction<any>(`${PREFIX}/updateCarRoute`)(payload)
}

export function updateCarRoute(state: WorkingState, action: Action<any>) {
  let newState: WorkingState = {...state}
  const payload = action.payload
  newState.workingPoint = payload.routes
  newState.fileList = payload.file_list
  console.log(newState)
  return newState
}

//获取全部文件
export function getAllFilesAction(payload: any) {
  return createAction<any>(`${PREFIX}/getAllFiles`)(payload)
}

export function getAllFiles(state: WorkingState, action: Action<any>) {
  let newState: WorkingState = {...state}
  const payload = action.payload
  newState.fileList = payload.file_list
  return newState
}


//获取全部工作路径点
export function getWorkingPointAction(payload: any) {
  console.log(payload)
  return createAction<any>(`${PREFIX}/getWorkingPoint`)(payload)
}

export function getWorkingPoint(state: WorkingState, action: Action<any>) {
  let newState: WorkingState = {...state}
  const payload = action.payload
  newState.workingPoint = payload.routes
  console.log(newState.workingPoint)
  return newState
}


//添加工作路径点
export function updateWorkingPointAction(payload: any) {
  return createAction<any>(`${PREFIX}/updateWorkingPoint`)(payload)
}

export function updateWorkingPoint(state: WorkingState, action: Action<any>) {
  let newState: WorkingState = {...state}
  const payload = action.payload
  newState.workingPoint = [...state.workingPoint, {lng: payload.lng, lat:payload.lat, status:'todo'}]
  return newState
}

//删除工作路径点
export function deleteWorkingPointAction(payload: any) {
  return createAction<any>(`${PREFIX}/deleteWorkingPoint`)(payload)
}

export function deleteWorkingPoint(state: WorkingState, action: Action<any>) {
  let newState: WorkingState = {...state}
  const payload = action.payload
  newState.workingPoint = newState.workingPoint.filter((point)=>{
    return !(point.lat < payload.lat+0.00005 && point.lat > payload.lat-0.00005 &&
             point.lng < payload.lng+0.00005 && point.lng > payload.lng-0.00005)
  })
  return newState
}

//优化航线后进行路径点的替换
export function updateAllPointAction(payload: any){
  return createAction<any>(`${PREFIX}/updateAllPoint`)(payload)
}

export function updateAllPoint(state: WorkingState , action: Action<any>){
  let newState:WorkingState = {...state}
  newState.workingPoint = action.payload
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
//export function sendRoutesAction(payload: {command:number}[]){
//  return createAction<{command:number}[]>(`${PREFIX}/sendRoutes`)(payload)
//}

/*export function *sendRoutes(action: Action<{command:number}[]>, effects: DVA.EffectsCommandMap){
  yield effects.put(updateRoadAction('true'))
  //const GPSPosition = changeLocationArray(action.payload)
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
  yield effects.put(updateRoadAction('false'))
  const newPosition: {lng:number, lat:number} = yield (() => {  //测试coordtransform坐标转换效果
    return changeLocation(parseFloat(GPSPosition[1].lng.toFixed(6)), parseFloat(GPSPosition[1].lat.toFixed(6)))
  })()
  yield effects.put(updateWorkingPointAction(newPosition))
}*/
export function sendRoutesAction(command: number) {
  return createAction<number>(`${PREFIX}/sendRoutes`)(command)
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
//更新返航路径信息的动作
export function sendBackRoutesAction(payload: {lng:number, lat:number, status:string}[]){
  return createAction<{lng:number, lat:number, status:string}[]>(`${PREFIX}/sendBackRoutes`)(payload)
}

export function *sendBackRoutes(action: Action<{lng:number, lat:number, status:string}[]>, effects: DVA.EffectsCommandMap){
  yield effects.put(updateRoadAction('true'))
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
    message.success("返航路径设置成功", 3)
    yield effects.put(sendStartAction(10))
  } else {
    message.error("返航路径设置失败", 3)
  }
  yield effects.put(updateRoadAction('false'))
  /*const newPosition: {lng:number, lat:number} = yield (() => {  //测试coordtransform坐标转换效果
    return changeLocation(parseFloat(GPSPosition[1].lng.toFixed(6)), parseFloat(GPSPosition[1].lat.toFixed(6)))
  })()
  yield effects.put(updateWorkingPointAction(newPosition))*/
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

export function findDistance(state: WorkingState, action: Action<Array<{lng:number, lat:number, status:string}>>) {
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

export function addBoundPoint(state: WorkingState, action: Action<{lng:number, lat:number}>) {
  let newState = {...state}
  const payload = action.payload
  newState.boundPoint = [...newState.boundPoint, {lng: payload.lng, lat: payload.lat}]
  return newState
}

//计算平扫路径的动作
export function calculateRouteAction(){
  return createAction(`${PREFIX}/calculateRoute`)()
}

export function calculateRoute(state: WorkingState) {
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

/**
 * 更改继电器的动作
 */
export function requestRelayChangeAction(newItem: number, relay: Array<boolean>) {
  let payload: RelayState = { num: newItem, relayState: relay }
  return createAction<RelayState>(`${PREFIX}/sendRelayData`)(payload)
}

export function* sendRelayData(action: Action<RelayState>, effects: DVA.EffectsCommandMap) {
  let payload = { ...action.payload }
  yield effects.put(manasLoadAction('true'))  //更新占线状态
  const status = payload.relayState[payload.num - 1] ? '关闭' : '开启'
  var status1 = 0
  if(status == '关闭')status1 = 17
  else status1 = 0
  message.info(`正在${status}${payload.num}号瓶子，请稍候...`, 3)
  const response1: ResponseState = yield (() => {
    let params = `?id=${payload.num}&act=${payload.relayState[payload.num - 1] ? 17 :0}`
    return request({
      url: `http://${IP}/ocean/control_relay${params}`
    })
  })()
  if(response1.status == 'ok'){
    const response2: ResponseState = yield (() => {
      let params = `?id=${8}&act=${status1}`
      return request({
        url: `http://${IP}/ocean/control_relay${params}`
      })
    })()
    if(response2.status == 'ok'){
      message.success(`${payload.num}号瓶子${status}成功！`, 3)
      yield effects.put(onRelayResponseAction(payload.num - 1, 1))
      yield effects.put(blinkAction(payload.num , payload.relayState))
    } else {
      message.error(`${payload.num}号瓶子${status}失败！`, 3)
      yield effects.put(blinkAction(payload.num , payload.relayState))
      if (status == "开启") {
        yield effects.put(onRelayResponseAction(payload.num - 1, 2))
      } else {
        yield effects.put(changeRelayAction({num: payload.num - 1, status: 1}))
      }
    }
  }

  else {
    message.error(`${payload.num}号瓶子${status}失败！`, 3)
    yield effects.put(blinkAction(payload.num , payload.relayState))
    if (status == "开启") {
      yield effects.put(onRelayResponseAction(payload.num - 1, 2))
    } else {
      yield effects.put(changeRelayAction({num: payload.num - 1, status: 1}))
    }
  }
  yield effects.put(manasLoadAction('false'))
}

//更改继电器状态
export function changeRelayAction(state: RelayResponse) {
  return createAction<RelayResponse>(`${PREFIX}/changeRelay`)(state)
}

export function changeRelay(state: ManageState, action: Action<RelayResponse>) {
  let newState = { ...state }
  const payload = action.payload
  newState.relayState[payload.num] = payload.status == 1
  newState.relayState[7] = payload.status == 1
  newState.relayStatus[payload.num] = 0
  newState.relayState = [... newState.relayState]
  return newState
}

//闪烁
export function blinkAction(newItem: number, relay: Array<boolean>) {
  let payload: RelayState = { num: newItem, relayState: relay }
  return createAction<RelayState>(`${PREFIX}/blink`)(payload)
}

export function blink(state: RelayState, action: Action<RelayState>) {
  let newState = { ...state }
  const itemNum = action.payload.num - 1
  let newArray = [ ...newState.relayState ]
  newArray[itemNum] = !newArray[itemNum]
  newState.relayState = newArray
  return newState
}

// 继电器返回成功或者失败状态的响应动作
export function onRelayResponseAction(newItem: number, status: number) {
  const payload: RelayResponse = { num: newItem, status: status }
  return createAction<RelayResponse>(`${PREFIX}/onRelayResponse`)(payload)
}

export function onRelayResponse(state: ManageState, action: Action<RelayResponse>) {
  const newState = { ...state }
  const payload = action.payload
  newState.relayStatus[payload.num] = payload.status
  newState.relayStatus = [...newState.relayStatus]
  return newState
}

export function onBottleClickAction(item: number) {
  return createAction<number>(`${PREFIX}/bottleClicked`)(item)
}

export function bottleClicked(state: ManageState, action: Action<number>) {
  let newState = { ...state }
  const itemNum = action.payload - 1
  let newArray = [ ...newState.relayClicked ]
  newArray[itemNum] = !newArray[itemNum]
  newState.relayClicked = newArray
  return newState
}

// 关闭取水瓶右侧面版
export function closeRelayPanelAction(item: number) {
  return createAction<number>(`${PREFIX}/closeRelayPanel`)(item)
}

export function closeRelayPanel(state: ManageState, action: Action<number>) {
  let newState = { ...state }
  const itemNum = action.payload - 1
  newState.relayClicked[itemNum] = false
  newState.relayState[itemNum] = false
  newState.relayClicked = [...newState.relayClicked]
  return newState
}

