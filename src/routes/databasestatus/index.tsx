import * as React from 'react'
import { connect } from 'dva'
import * as Redux from 'redux'
import SVG from 'react-inlinesvg'
import { style, media } from 'typestyle'
import { Button, Slider,Switch } from 'antd'
import 'antd/dist/antd.css'
import {PREFIX, DatabaseState} from '../../models/databasestatus/index'
import {simuDataAction} from '../../models/databasestatus/databasestatus'
import Log from '../../components/databasestatus/log'
import Dataser, { updateLegeng } from '../../components/databasestatus/datas'
import Memoryer from '../../components/databasestatus/memory'
import CPUer from '../../components/databasestatus/cpu'
import Networker from '../../components/databasestatus/network'

type DatabaseProps = DatabaseState

var  legends = {
  'ph':'none',
  '电导率':'none',
  '浊度':'none',
  '溶解氧':'none',
  '温度':'none'
}

interface MainDispatch {
  dispatch: Redux.Dispatch<any>
}

class Main extends React.Component<DatabaseProps & MainDispatch, any> {
  t:any ///存储setInterval的返回值用于清理
  
  render() {
    const wholeStyle = style ({
      height:'945px',
      width:'1600px'
    })
    const blockStyle = style({
      //height: '160px',
      height:'945px',
      // background: 'white',
      // borderRadius: '5px',
      position: 'absolute',
      // boxShadow: '2px 2px 5px',
      left: '0px',
      // top: '80px',
      right: '0px',
      opacity: 0.96,
      display: 'flex',
      alignItems: 'center',
      width:'570px',
      overflow:'hidden',
      // overflowX:'hidden'
      borderStyle:'dashed',
      borderColor:'green'
    },
    media({minWidth:3800}, 
      {
        height: '500px',
        // top: '20px',
        // boxShadow: '5px 5px 10px',
      }
    ))

    const block1Style = style({
      position: 'absolute',
      // height:'140px',
      left: '140px',
      // width:'140px',
      // top:'30px',
      top:'5px',
      borderRadius: '70px',
      // background:'red',
      color: 'green',
      fontSize: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // padding:'5px'
    },
    media({minWidth:3800}, 
      {
        zoom:3,
        left: '60px'
      }
    ))

    const block2Style = style({
      position: 'absolute',
      height:'110px',
      left: '20px',
      width:'120px',
      // top:'30px',
      top:'80px',
      // borderRadius: '70px',
      background:'black',
      color: 'white',
      fontSize: '14px',
      display: 'flex',
      textAlign:'center',
      paddingLeft:'31px'
      // alignItems: 'center',
      // justifyContent: 'center',
      // padding:'5px'
    },
    media({minWidth:3800}, 
      {
        zoom:3,
        left: '60px'
      }
    ))

    const block3Style = style({
      position: 'absolute',
      height:'110px',
      left: '150px',
      width:'280px',
      top:'80px',
      // top:'230px',
      // borderRadius: '70px',
      background:'black',
      // color: 'red',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // padding:'5px'
    },
    media({minWidth:3800}, 
      {
        zoom:3,
        left: '60px'
      }
    ))

    const block4Style = style({
      position: 'absolute',
      height:'110px',
      left: '440px',
      width:'120px',
      top:'80px',
      // borderRadius: '10px',
      background:'black',
      color: 'white',
      fontSize: '14px',
      display: 'flex',
      textAlign:'center',
      paddingLeft:'20px'
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    media({minWidth:3800}, 
      {
        height: '300px',
        width:'600px',
        left: '750px',
        fontSize: '35px',
      }
    ))

    const block5Style = style({
      position: 'absolute',
      height:'200px',
      left: '20px',
      width:'540px',
      top:'195px',
      // borderRadius: '10px',
      background:'black',
      // color: 'white',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    media({minWidth:3800}, 
      {
        height: '300px',
        width:'600px',
        left: '750px',
        fontSize: '35px',
      }
    ))

    const block6Style = style({
      position: 'absolute',
      height:'200px',
      left: '20px',
      width:'540px',
      top:'400px',
      // borderRadius: '10px',
      background:'black',
      // color: 'white',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    media({minWidth:3800}, 
      {
        height: '300px',
        width:'600px',
        left: '750px',
        fontSize: '35px',
      }
    ))

    const block7Style = style({
      position: 'absolute',
      // height:'150px',
      left: '140px',
      // width:'140px',
      top:'605px',
      // borderRadius: '10px',
      //background:'red',
      color: 'green',
      fontSize: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    media({minWidth:3800}, 
      {
        height: '300px',
        width:'600px',
        left: '750px',
        fontSize: '35px',
      }
    ))

    const block8Style = style({
      position: 'absolute',
      // height:'150px',
      // left: '50px',
      // width:'140px',
      top:'620px',
      borderRadius: '10px',
      //background:'red',
      color: 'white',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    media({minWidth:3800}, 
      {
        height: '300px',
        width:'600px',
        left: '750px',
        fontSize: '35px',
      }
    ))

    const widthStyle = style({
      //height: '160px',
      height:'945px',
      width:'1040px',
      // background: 'white',
      // borderRadius: '5px',
      position: 'absolute',
      // boxShadow: '2px 2px 5px',
      left: '570px',
      //top: '10px',
      right: '0px',
      opacity: 0.96,
      display: 'flex',
      alignItems: 'center',
      // overflow:'hidden'
      borderStyle:'dashed',
      borderColor:'green'
    },
    media({minWidth:3800}, 
      {
        height: '500px',
        top: '20px',
        boxShadow: '5px 5px 10px',
      }
    ))

    const width1Style = style({
      position: 'absolute',
      // height:'150px',
      // left: '550px',
      // width:'200px',
      // top:'10px',
      top:'0px',
      // borderRadius: '10px',
      //background:'red',
      // color: '#00FFA3',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    })

    const SwitchStyle = style({
      position: 'absolute',
      left: '35px',
      top: '30px',
      zIndex: 10,
      // left:'40px',
      // height:'50px',
      width:'109px',
      textAlign:'center',
      zoom: 2.0,
    })
    

    const Switch1Style = style({
      position: 'absolute',
      left: '35px',
      top: '55px',
      // left:'100px',
      width:'109px',
      textAlign:'center',
      // zIndex: 10,
      zoom: 2.0
    })

    const Switch2Style = style({
      position: 'absolute',
      left: '35px',
      top: '80px',
      // left:'40px',
      width:'109px',
      textAlign:'center',
      // zIndex: 10,
      zoom: 2.0
    })

    const Switch3Style = style({
      position: 'absolute',
      left: '35px',
      top: '105px',
      // left:'100px',
      width:'109px',
      textAlign:'center',
      // zIndex: 10,
      zoom: 2.0
    })

    const Switch4Style = style({
      position: 'absolute',
      left: '35px',
      top: '130px',
      width:'109px',
      textAlign:'center',
      // left:'40px',
      // zIndex: 10,
      zoom: 2.0
    })

    const Text1Style = style({
      position: 'absolute',
      left: '305px',
      top: '50px',
      zIndex: 10,
      // left:'40px',
      // height:'50px',
      width:'109px',
      textAlign:'center',
      fontSize:'40px',
      // color:'black'
      color:'black'
      // zoom: 2.0,
    })

    const Text2Style = style({
      position: 'absolute',
      left: '305px',
      top: '100px',
      zIndex: 10,
      // left:'40px',
      // height:'50px',
      width:'109px',
      textAlign:'center',
      fontSize:'40px',
      // color:'black'
      color:'black'
      // zoom: 2.0,
    })

    const Text3Style = style({
      position: 'absolute',
      left: '305px',
      top: '150px',
      zIndex: 10,
      // left:'40px',
      // height:'50px',
      width:'109px',
      textAlign:'center',
      fontSize:'40px',
      // color:'black'
      color:'black'
      // zoom: 2.0,
    })

    const Text4Style = style({
      position: 'absolute',
      left: '305px',
      top: '200px',
      zIndex: 10,
      // left:'40px',
      // height:'50px',
      width:'109px',
      textAlign:'center',
      fontSize:'40px',
      // color:'black'
      color:'black'
      // zoom: 2.0,
    })

    const Text5Style = style({
      position: 'absolute',
      left: '305px',
      top: '250px',
      zIndex: 10,
      // left:'40px',
      // height:'50px',
      width:'109px',
      textAlign:'center',
      fontSize:'40px',
      // color:'black'
      color:'black'
      // zoom: 2.0,
    })

    return (
      <div className = {wholeStyle} >
        <div className = {blockStyle} >
          <div className = {block1Style}>
            <p>服务器状态</p>
          </div>
          <div className={block2Style}>
            <p>CPU core<br/><br/><br/><b>24</b></p>
          </div>
          <div className={block3Style}>
            <Memoryer />
          </div>
          <div className={block4Style}>
            <p>Total memory<br/><br/><br/><b>67.6 GB</b></p>
          </div>
          <div className={block5Style}>
            <CPUer />
          </div>
          <div className={block6Style}>
            <Networker />
          </div>
          <div className={block7Style}>
            <p>数据库状态</p>
          </div>
          <div className = {block8Style}>
          <Switch className={SwitchStyle}   checkedChildren="温度" unCheckedChildren="温度"  onChange={(checked:boolean)=>this.selectedCheck('温度',checked)}/>
          <div className={Text1Style} style={{display:legends['温度']}}><p>{this.props.temperature.toFixed(2)}℃</p> </div>
          <Switch className={Switch1Style} checkedChildren="ph" unCheckedChildren="ph" onChange={(checked:boolean)=>this.selectedCheck('ph',checked)}/>
          <div className={Text2Style} style={{display:legends['ph']}}><p>{this.props.ph.toFixed(2)}</p></div>
          <Switch className={Switch2Style}  checkedChildren="浊度" unCheckedChildren="浊度" onChange={(checked:boolean)=>this.selectedCheck('浊度',checked)}/>
          <div className={Text3Style} style={{display:legends['浊度']}}><p>{this.props.turbidity.toFixed(2)}(FNU)</p></div>
          <Switch className={Switch3Style} checkedChildren="溶解氧" unCheckedChildren="溶解氧" onChange={(checked:boolean)=>this.selectedCheck('溶解氧',checked)}/>
          <div className={Text4Style} style={{display:legends['溶解氧']}}><p>{this.props.oxygen.toFixed(2)}(mg/L)</p></div>
          <Switch className={Switch4Style}  checkedChildren="电导率" unCheckedChildren="电导率" onChange={(checked:boolean)=>this.selectedCheck('电导率',checked)}/>
          <div className={Text5Style} style={{display:legends['电导率']}}><p>{this.props.conductivity.toFixed(2)}(mS/cm)</p></div>
          </div>
        </div>

        <div className = {widthStyle}>
          <div className = {width1Style} >
            <Dataser speed = {this.props.speed} angle = {this.props.angle} battery = {this.props.battery} ph = {this.props.ph}
                  communicate = {this.props.communicate} radius = {this.props.radius}
                  time = {this.props.time} conductivity = {this.props.conductivity} turbidity = {this.props.turbidity}
                  oxygen = {this.props.oxygen} lng = {this.props.lng} lat = {this.props.lat}
                  temperature = {this.props.temperature}/>
          </div>
        </div>

      </div>
    )
  }

  selectedCheck(param,checked){
      legends[param] = checked == true?'block':'none'
      updateLegeng(param,checked)
  }

  componentWillUnmount() {
    if (this.t) {
      clearInterval(this.t)
    }
  }
  
  componentDidMount() {
    
    this.t = setInterval(() => {
      this.props.dispatch(simuDataAction())
    }, 3000)
  }
}

function StateToProps(state: any): DatabaseState {
  return state[PREFIX] as DatabaseState
}

export = connect(StateToProps)(Main)
