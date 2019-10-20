import * as React from 'react'
import {connect} from 'dva'
import * as Redux from 'redux'
import {Button,Progress,Switch} from 'antd'
import {style,media} from 'typestyle'
import {Map, Marker, NavigationControl , MapTypeControl , MapvLayer,Merge} from 'react-bmap'
import {message} from 'antd'
import 'antd/dist/antd.css'
import FivePropsTabler , {changeShow}from '../../components/planstatus/table'
import Exceler from '../../components/databasestatus/excel'
import Gauge from '../../components/planstatus/gauge'
import InfoBox from '../../components/planstatus/infobox'
import Log from '../../components/planstatus/log'
import ContextMenu from '../../components/planstatus/contextMenu'
import WorkingPoint from '../../components/planstatus/workingPoint'
import {PREFIX, PlanState, ShowItemState,TimeState , NameState , ThemeState} from '../../models/planstatus/index' 
import {simuDataAction, sendRoutesAction, findDistanceAction, updateNameAction , addBoundPointAction, calculateRouteAction,updateAlertStationAction,getPositionAction,sendStartAction,updateThemeAction} from '../../models/planstatus/planstatus' 
import {changeItemAction, clearItemAction} from '../../models/planstatus/showItem'
import * as coordtransform from 'coordtransform'
import {changeTimeAction, clearTimeAction, changeAlertTimeAction, clearAlertTimeAction, sendReturnAction, toggleModeAction} from '../../models/planstatus/changeTime' 
declare let BMap
declare const BMAP_SATELLITE_MAP
declare const BMAP_HYBRID_MAP
declare function require(path: string): any
type MainProps = PlanState
type ItemProps = ShowItemState
type TimeProps = TimeState 
type NameProps = NameState
type ThemePorps = ThemeState
interface MainDispatch {
  dispatch: Redux.Dispatch<any>
}
  //表头
var jsono =[{
  "水质报告": "时间", "水质报告2": "温度(℃)", "水质报告3": "ph", "水质报告4": "电导率(mS/cm)", "水质报告5": "浊度(FNU)","水质报告6": "溶解氧(mg/L)","水质报告7": "经度","水质报告8": "纬度",
}];
var data = [[],[],[],[],[],[],[]] //存储热力图数组
class Main extends React.Component<MainProps & ItemProps & MainDispatch & TimeProps & NameProps & ThemePorps, any> { 
  t:any ///存储setInterval的返回值用于清理
  t1:any//存储计时器 
  t2:any //警告模式闪烁效果计时器
  th:any  //主题切换

  render(){
    const wholeStyle = style ({
      height:'100vh',
      // width:'1600px',
      backgroundColor:this.props.theme == "false"?'#424250':'#e6e6e6'
    })

    const totaldis = style ({  //总计航行栏样式
      position:'absolute',
      top:'35px',
      left:'24px',
      width:'170px',
      height:'176px',
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff'
    },
    media({minWidth:1700},
      {
        top:'39px',
        left:'34px',
        width:'238px',
        height:'194px'
      }
    ))

    const totaldisTextStyle = style ({ //总机航行文字样式
      position:'absolute',
      top:'10px',
      left:'15px',
      width:'135px',
      height:'26px',
      fontFamily:'PingFangSC',
      fontSize:'16px',
      fontWeight:600,
      fontStyle:'normal',
      fontStretch:'normal',
      lineHeight:1.63,
      letterSpacing:'0.6px',
      textAlign:'left',
      color:this.props.theme == "false"?'#e3e3e3':'#000'
    },
    media({minWidth:1700},
      {
        top:'11px',
        left:'21px',
        width:'189px',
        height:'29px',
        fontSize:'22px',
        fontWeight:840,
        lineHeight:2.28,
      }
    ))

    const totaldisLine = style ({  //总计航行栏分割线
      position:'absolute',
      top:'46px',
      width:'170px',
      height:'1px',
      opacity:0.24,
      backgroundColor:'#297fca'
    },
    media({minWidth:1700},
      {
        top:'51px',
        width:'238px',
      }
    ))

    const totaldisNumStyle = style ({  //总计航行样式
      position:'absolute',
      top:'74px',
      left:'24px',
      width:'110px',
      height:'68px',
      fontFamily:'Impact',
      fontSize:'56px',
      fontWeight:'normal',
      fontStyle:'normal',
      fontStretch:'normal',
      lineHeight:'normal',
      letterSpacing:'2.1px',
      textAlign:'left',
      color:this.props.theme == "false"?'#e3e3e3':'#000'
    },
    media({minWidth:1700},
      {
        top:'81px',
        left:'34px',
        width:'153px',
        height:'75px',
        fontSize:'78px',
      }
    ))

    const totaldisComStyle = style ({  //总计航行单位样式
      position:'absolute',
      top:'35px',
      fontSize:'16px'
    },
    media({minWidth:1700},
      {
        top:'52px',
        fontSize:'22px'
      }
    ))

    const water = style ({  //采集水样栏样式
      position:'absolute',
      top:'35px',
      left:'224px',
      width:'170px',
      height:'176px',
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff'
    },
    media({minWidth:1700},
      {
        top:'39px',
        left:'314px',
        width:'238px',
        height:'194px'
      }
    ))

    const waterTextStyle = style ({ //采集水样文字样式
      position:'absolute',
      top:'10px',
      left:'15px',
      width:'135px',
      height:'26px',
      fontFamily:'PingFangSC',
      fontSize:'16px',
      fontWeight:600,
      fontStyle:'normal',
      fontStretch:'normal',
      lineHeight:1.63,
      letterSpacing:'0.6px',
      textAlign:'left',
      color:this.props.theme == "false"?'#e3e3e3':'#000'
    },
    media({minWidth:1700},
      {
        top:'11px',
        left:'21px',
        width:'189px',
        height:'29px',
        fontSize:'22.4px',
        fontWeight:840,
        lineHeight:1.79
      }
    ))

    const waterLine = style ({  //采集水样栏分割线
      position:'absolute',
      top:'46px',
      width:'170px',
      height:'1px',
      opacity:0.24,
      backgroundColor:'#297fca'
    },
    media({minWidth:1700},
      {
        top:'51px',
        width:'238px',
      }
    ))

    const waterNumStyle = style ({  //采集水样样式
      position:'absolute',
      top:'74px',
      left:'21px',
      width:'134px',
      height:'68px',
      fontFamily:'Impact',
      fontSize:'56px',
      fontWeight:'normal',
      fontStyle:'normal',
      fontStretch:'normal',
      lineHeight:'normal',
      letterSpacing:'2.1px',
      textAlign:'left',
      color:this.props.theme == "false"?'#e3e3e3':'#000'
    },
    media({minWidth:1700},
      {
        top:'81px',
        left:'29px',
        width:'188px',
        height:'75px',
        fontSize:'78px'
      }
    ))

    const waterComStyle = style ({  //采集水样单位样式
      position:'absolute',
      top:'35px',
      fontSize:'16px'
    },
    media({minWidth:1700},
      {
        top:'52px',
        fontSize:'22px'
      }
    ))

    const cover = style ({  //覆盖采集点栏样式
      position:'absolute',
      top:'35px',
      left:'424px',
      width:'170px',
      height:'176px',
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff'
    },
    media({minWidth:1700},
      {
        top:'39px',
        left:'594px',
        width:'238px',
        height:'194px'
      }
    ))

    const coverTextStyle = style ({ //覆盖采集点文字样式
      position:'absolute',
      top:'10px',
      left:'15px',
      width:'135px',
      height:'26px',
      fontFamily:'PingFangSC',
      fontSize:'16px',
      fontWeight:600,
      fontStyle:'normal',
      fontStretch:'normal',
      lineHeight:1.63,
      letterSpacing:'0.6px',
      textAlign:'left',
      color:this.props.theme == "false"?'#e3e3e3':'#000'
    },
    media({minWidth:1700},
      {
        top:'11px',
        left:'21px',
        width:'189px',
        height:'29px',
        fontSize:'22px',
        fontWeight:840,
        lineHeight:1.79
      }
    ))

    const coverLine = style ({  //覆盖采集点栏分割线
      position:'absolute',
      top:'46px',
      width:'170px',
      height:'1px',
      opacity:0.24,
      backgroundColor:'#297fca'
    },
    media({minWidth:1700},
      {
        top:'51px',
        width:'238px'
      }
    ))

    const coverNumStyle = style ({  //覆盖采集点样式
      position:'absolute',
      top:'71px',
      left:'18px',
      width:'133px',
      height:'68px',
      fontFamily:'Impact',
      fontSize:'56px',
      fontWeight:'normal',
      fontStyle:'normal',
      fontStretch:'normal',
      lineHeight:'normal',
      letterSpacing:'2.1px',
      textAlign:'left',
      color:this.props.theme == "false"?'#e3e3e3':'#000'
    },
    media({minWidth:1700},
      {
        top:'80px',
        left:'25px',
        width:'186px',
        height:'75px',
        fontSize:'78px'
      }
    ))

    const coverComStyle = style ({  //覆盖采集点单位样式
      position:'absolute',
      top:'35px',
      fontSize:'16px'
    },
    media({minWidth:1700},
      {
        top:'52px',
        fontSize:'22px'
      }
    ))

    const phstyle = style ({  //ph栏样式
      position:'absolute',
      top:'225px',
      left:'24px',
      width:'100px',
      height:'157px',
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff'
    },
    media({minWidth:1700},
      {
        top:'248px',
        left:'34px',
        width:'140px',
        height:'172px'
      }
    ))

    const phTextStyle = style ({ //ph文字样式
      position:'absolute',
      top:'10px',
      left:'0px',
      width:'100px',
      height:'26px',
      fontFamily:'PingFangSC',
      fontSize:'16px',
      fontWeight:600,
      fontStyle:'normal',
      fontStretch:'normal',
      lineHeight:1.63,
      letterSpacing:'0.6px',
      textAlign:'center',
      color:this.props.theme == "false"?'#e3e3e3':'#000'
    },
    media({minWidth:1700},
      {
        top:'11px',
        width:'140px',
        height:'29px',
        fontSize:'22px',
        fontWeight:840,
        lineHeight:1.79
      }
    ))

    const phLine = style ({  //ph栏分割线
      position:'absolute',
      top:'46px',
      width:'100px',
      height:'1px',
      left:'0px',
      opacity:0.24,
      backgroundColor:'#297fca'
    },
    media({minWidth:1700},
      {
        top:'51px',
        width:'140px',
      }
    ))

    const phNumStyle = style ({  //ph样式
      position:'absolute',
      top:'70px',
      left:'0px',
      width:'100px',
      height:'31px',
      fontFamily:'Impact',
      fontSize:'26px',
      fontWeight:'normal',
      fontStyle:'normal',
      fontStretch:'normal',
      lineHeight:'normal',
      letterSpacing:'1px',
      textAlign:'center',
      color:this.props.theme == "false"?'#e3e3e3':'#000'
    },
    media({minWidth:1700},
      {
        top:'77px',
        width:'140px',
        height:'34px',
        fontSize:'36px'
      }
    ))

    const updateStyle = style ({  //增长样式
      position:'absolute',
      top:'118px',
      left:'0px',
      width:'100px',
      height:'19px',
      fontFamily:'Impact',
      fontSize:'16px',
      fontWeight:'normal',
      fontStyle:'normal',
      fontStretch:'normal',
      lineHeight:'normal',
      letterSpacing:'0.6px',
      textAlign:'center',
      color:this.props.theme == "false"?'#e3e3e3':'#000'
    },
    media({minWidth:1700},
      {
        top:'130px',
        width:'140px',
        height:'21px',
        fontSize:'22px'
      }
    ))

    const tempstyle = style ({  //温度栏样式
      position:'absolute',
      top:'225px',
      left:'144px',
      width:'100px',
      height:'157px',
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff'
    },
    media({minWidth:1700},
      {
        top:'248px',
        left:'202px',
        width:'140px',
        height:'174px'
      }
    ))

    const oxygenstyle = style ({  //氧气栏样式
      position:'absolute',
      top:'225px',
      left:'264px',
      width:'100px',
      height:'157px',
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff'
    },
    media({minWidth:1700},
      {
        top:'248px',
        left:'370px',
        width:'140px',
        height:'174px'
      }
    ))

    const turstyle = style ({  //浊度栏样式
      position:'absolute',
      top:'225px',
      left:'384px',
      width:'100px',
      height:'157px',
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff'
    },
    media({minWidth:1700},
      {
        top:'248px',
        left:'538px',
        width:'140px',
        height:'174px'
      }
    ))

    const conducstyle = style ({  //电导率栏样式
      position:'absolute',
      top:'225px',
      left:'504px',
      width:'100px',
      height:'157px',
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff'
    },
    media({minWidth:1700},
      {
        top:'248px',
        left:'706px',
        width:'140px',
        height:'174px'
      }
    ))

    const mapStyle = style ({ //地图样式
      position:'absolute',
      top:'36px',
      left:'624px',
      width:'570px',
      height:'346px',
      opacity:0.96,
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff'
    },
    media({minWidth:1700},
      {
        top:'40px',
        left:'874px',
        width:'798px',
        height:'381px'
      }
    ))

    const mapButton = style ({  //地图右上方添加航点按钮
      position:'absolute',
      top:'36px',
      left:'824px',
      width:'80px',
      height:'24px',
      fontFamily:'PingFangSC',
      fontSize:'12px',
      fontWeight:'normal',
      fontStyle:'normal',
      fontStretch:'normal',
      lineHeight:'normal',
      letterSpacing:'normal',
      textAlign:'center',
      background:'#363636',
      borderRadius:'13.3px',
      border:'solid 1px #e3e3e3',
      zIndex:10,
    },media({minWidth:1700},
      {
        top:'40px',
        left:'1580.2px',
        // width:'78.8px',
        // height:'26.4px',
        fontSize:'14.2px'
      }
    ))

    const tableStyle = style ({ //表格栏样式
      position:'absolute',
      top:'414px',
      left:'26px',
      width:'1168px',
      height:'485px',
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff'
    },
    media({minWidth:1700},
      {
        top:'455px',
        left:'36px',
        width:'1635px',
        height:'440px'
      }
    ))

    const tableLine = style ({  //表格栏分割线
      position:'absolute',
      top:'46px',
      left:'0px',
      width:'1168px',
      height:'1px',
      opacity:0.24,
      backgroundColor:'#297fca'
    },
    media({minWidth:1700},
      {
        top:'50.6px',
        width:'1635px',

      }
    ))

    const tablePos = style ({ //表格组件样式
      position:'absolute',
      top:'40px',
      left:'8px',
      width:'1141px',
      height:'322px',
    },
    media({minWidth:1700},
      {
        top:'75.9px',
        // left:'11.2px',
        width:'1597.4px',
        height:'354.2px'
      }
    ))

    const tableText = style ({  //表格文字样式
      position:'absolute',
      top:'10px',
      left:'15px',
      width:'1003px',
      height:'26px',
      fontSize:'16px',
      textAlign:'left',
      lineHeight:'26px',
      letterSpacing:'0.6px',
      color:this.props.theme == "false"?'#e3e3e3':'#000'
    },media({minWidth:1700},
      {
        top:'11px',
        left:'21px',
        width:'1404.2px',
        height:'28.6px',
        fontSize:'22.4px'
      }
    ))

    const tableButton = style ({  //表格按钮样式
      position:'absolute',
      top:'16px',
      left:'1047px',
      width:'100px',
      height:'39px',
      fontFamily:'PingFangSC',
      fontSize:'16px',
      textAlign:'center',
      letterSpacing:'1,1px',
      borderRadius:'3px',
      backgroundColor:this.props.theme == "false"?'#363636':'#fff',
      border:'solid 1px #2298ff',
      color:'#2298ff'
    },media({minWidth:1700},
      {
        top:'17.6px',
        left:'1465.8px',
        width:'140px',
        height:'42.9px',
        fontSize:'22.4px'
      }
    ))

    return (
      <div className = {wholeStyle}>

        {/*总计航行栏*/}
        <div className = {totaldis} >
          <div className = {totaldisTextStyle} >总计航行</div>
          <div className = {totaldisLine} />
          <div className = {totaldisNumStyle} > 128
            <span className = {totaldisComStyle} > km</span>
          </div>
        </div>

        {/*采集水样栏*/}
        <div className = {water} >
          <div className = {waterTextStyle} >采集水样</div>
          <div className = {waterLine} />
          <div className = {waterNumStyle} > 124
            <span className = {waterComStyle} > bottle</span>
          </div>
        </div>

        {/*覆盖采集点栏*/}
        <div className = {cover} >
          <div className = {coverTextStyle} >覆盖采集点</div>
          <div className = {coverLine} />
          <div className = {coverNumStyle} >108
            <span className = {coverComStyle} >point</span>
          </div>
        </div>

        {/*ph*/}
        <Button className = {phstyle} type = "primary" onClick = {() => {this.changeTable("ph")}}>
          <div className = {phTextStyle} >PH</div>
          <div className = {phLine} />
          <div className = {phNumStyle} >{this.props.ph == undefined ? 7.6:this.props.ph.toFixed(2)}</div>
          <div className = {updateStyle} > {this.getAdd('ph')}%</div>
        </Button>

        {/*温度*/}
        <Button className = {tempstyle} type = "primary" onClick = {() => {this.changeTable("温度")}}>
          <div className = {phTextStyle} >温度</div>
          <div className = {phLine} />
          <div className = {phNumStyle} >{this.props.temperature == undefined ? 28.4:this.props.temperature.toFixed(2)}℃</div>
          <div className = {updateStyle} >{this.getAdd('温度')}%</div>
        </Button>

        {/*氧气*/}
        <Button className = {oxygenstyle} type = "primary" onClick = {() => {this.changeTable("溶解氧")}}>
          <div className = {phTextStyle} > 溶解氧</div>
          <div className = {phLine} />
          <div className = {phNumStyle} style={{top:window.innerWidth>1700?'54px':'47px'}}>{this.props.oxygen == undefined ? 123:this.props.oxygen.toFixed(2)}<br/>mg</div>
          <div className = {updateStyle} >{this.getAdd('溶解氧')}%</div> 
        </Button>

        {/*浊度*/}
        <Button className = {turstyle} type = "primary" onClick = {() => {this.changeTable("浊度")}}>
          <div className = {phTextStyle} >浊度</div>
          <div className = {phLine} />
          <div className = {phNumStyle} style={{top:window.innerWidth>1700?'54px':'47px'}}>{this.props.turbidity == undefined ? 123:this.props.turbidity.toFixed(2)}<br/>FNU</div>
          <div className = {updateStyle}>{this.getAdd('浊度')}%</div>
        </Button>

        {/*电导率*/}
        <Button className = {conducstyle} type = "primary" onClick = {() => {this.changeTable("电导率")}}>
          <div className = {phTextStyle} >电导率</div>
          <div className = {phLine} />
          <div className = {phNumStyle} style={{top:window.innerWidth>1700?'54px':'47px'}}>{this.props.conductivity == undefined ? 0 : this.props.conductivity.toFixed(2)}<br/>mS/cm</div>
          <div className = {updateStyle} >{this.getAdd('电导率')}%</div>
        </Button>

        {/*地图*/}
        <div className = {mapStyle} >
          <Map style={{height:'100%', 
                width:'100%'}} 
                center={this.props.workingPoint[0]?this.props.workingPoint[0]:(this.props.lng?{lng: this.props.lng, lat: this.props.lat}:{lng: 121.445967, lat:31.032097})} 
                zoom={19} enableScrollWheelZoom
                mapType={BMAP_HYBRID_MAP}
                >
                <MapvLayer data={this.getdata()} options={{
                size:13,
                gradient:{0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"}, //0-3浅黄 ， 4-7深黄 ，8-12橘黄
                max:100,
                draw:'heatmap'
              }} />
          </Map>
        </div>
        <Button className = {mapButton} type = "primary" onClick = {() => {this.changeTable("路径")}}>显示路径</Button>

        {/*折线图*/}
        <div className = {tableStyle} >
          <div className = {tableText} >{this.props.name}含量变化</div>
          <div className = {tableLine} />
          <Button className = {tableButton} onClick={() => {this.downonloadFilt()}}>导出表格</Button>
          <div className = {tablePos} >
          <FivePropsTabler ph={this.props.ph} conductivity={this.props.conductivity} oxygen={this.props.oxygen} temperature={this.props.temperature}
            turbidity={this.props.turbidity} />
          </div>
        </div>
        {this.updateData()}

      </div>
    )

  }

  //获取增长百分比
  getAdd(name){  
    var nowname = () => {
      switch(name){
        case 'ph':return 0;
        case '电导率':return 1;
        case '浊度':return 2;
        case '溶解氧':return 3;
        case '温度':return 4;
      }
    }
    var nowdata = data[nowname()];  //获取当前选中参数的数据数组
    var length = data[nowname()].length;  //获取数组长度  
    if(length == 0 || length == 1) return 0;
    else {
      var last = nowdata[length-2];
      var now = nowdata[length-1];
      if(last == 0)return now - last * 100;
      return (100 * (now - last) / last).toFixed(2);
    }
  }
  

  //改变折线图数据显示
  changeTable(name){
    if(name == this.props.name)return ;
    if(name != "路径")    changeShow(name)
    this.props.dispatch(updateNameAction(name))
  }

  //热力图参数初始化
  getdata(){
    // var randomCount=100;
    // data[0] = [];
    var namea = this.props.name //获取当前选中参数
    var nowname = () => {
      switch(namea){
        case 'ph':return 0;
        case '电导率':return 1;
        case '浊度':return 2;
        case '溶解氧':return 3;
        case '温度':return 4;
        case '路径':return 5;
      }
    }  
    var nowdata = data[nowname()];  //获取当前选中参数的数据数组
    // console.log(data);
    var length = data[nowname()].length;  //获取数组长度
    var redata = [] //用于存储返回给热力图的参数
    var countnum = (num) => { //对应参数的权值计算方式
      switch(namea){
        case 'ph':return nowdata[num] * 10; //ph 6~9
        case '电导率':return nowdata[num] > 100?nowdata[num] / 100 * 10:nowdata[num] / 10;  //0～700
        case '温度':return nowdata[num] + 60 * Math.random(); //0~40
        case '浊度':return nowdata[num];  //0~100
        case '溶解氧':return nowdata[num] * 10; //0~7.5
        case '路径':return 30 * Math.random()
      }
    }
    // 构造数据 
    while (length--) {
        // var cityCenter = Map.utilCityCenter.getCenterByCityName(citys[(Math.random() * citys.length)]);
        redata.push({
            geometry: {
                type: 'Point',
                coordinates: [data[5][length], data[6][length]]
                // coordinates: [data[5][length] - 0.0000002 + Math.random() /1000 , data[6][length] - 0.00000002 + Math.random() /1000  ] //测试数据
                // coordinates: [data[5][length] + 0.0000002 * length , data[6][length] + 0.00000002 * length  ] //测试路径数据
            },
            count: countnum(length)
        });
    }
    // console.log(data[0])
    return redata;
  }

  //记录数据，为导出excel做准备
  updateData(){
    var json = { //测试数据
      "水质报告":new Date().toLocaleTimeString(),
      "水质报告2":this.props.temperature.toString(),
      "水质报告3":this.props.ph.toString(),
      "水质报告4":this.props.conductivity.toString(),
      "水质报告5":this.props.turbidity.toString(),
      "水质报告6":this.props.oxygen.toString(),
      "水质报告7":this.props.lng.toString(),
      "水质报告8":this.props.lat.toString()
    };

    jsono.push(json);
    data[0].push(this.props.ph) //ph
    data[1].push(this.props.conductivity) //电导率
    data[2].push(this.props.turbidity)  //浊度
    data[3].push(this.props.oxygen) //溶解氧
    data[4].push(this.props.temperature)  //温度
    data[5].push(this.props.lng)  //经度
    data[6].push(this.props.lat)  //纬度
  }
  //导出excel
  downonloadFilt(){

    // var json = { //测试数据
    //     "时间":new Date().toLocaleTimeString(),
    //     "温度(℃)":this.props.radius,
    //     "ph":this.props.ph,
    //     "电导率(mS/cm)":this.props.conductivity,
    //     "浊度(FNU)":this.props.turbidity,
    //     "溶解氧(mg/L)":this.props.oxygen,
    //     "经度":this.props.lng,
    //     "纬度":this.props.lat
    // };

    

    var sign = { //测试数据
        "水质报告":"",
        "水质报告2":"",
        "水质报告3":"",
        "水质报告4":"",
        "水质报告5":"时间",
        "水质报告6":new Date().toLocaleTimeString(),
        "水质报告7":"负责人",
        "水质报告8":"王海博"
    };

    jsono.push(sign);


    const exceler = new Exceler
    // exceler.getFunc()
    exceler.downloadExl(jsono,'xlsx')
    // jsono = [{
    //     "水质报告": "时间", "水质报告2": "温度(℃)", "水质报告3": "ph", "水质报告4": "电导率(mS/cm)", "水质报告5": "浊度(FNU)","水质报告6": "溶解氧(mg/L)","水质报告7": "经度","水质报告8": "纬度",
    // }]
  }


  componentWillUnmount() {
    if (this.t) {
      clearInterval(this.t)
    }
    if (this.t1) {
      clearInterval(this.t1)
    }
    if (this.t2) {
      clearInterval(this.t2)
    }
    if(this.th) {
      clearInterval(this.th)
    }
  }
  
  componentDidMount() {
    this.t = setInterval(() => {
      this.props.dispatch(simuDataAction())
      // this.props.dispatch(findDistanceAction(this.props.workingPoint))
    }, 3000)
    this.th = setInterval(() => {
      this.props.dispatch(updateThemeAction(sessionStorage.getItem('theme')))
    },100)
  }
}

function mapStateToProps(state: any): PlanState {
  return state[PREFIX] as PlanState
}

export = connect(mapStateToProps)(Main)