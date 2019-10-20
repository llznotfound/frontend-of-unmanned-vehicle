import * as React from 'react'
import {style,media} from 'typestyle'

import {DatabaseState} from '../../models/databasestatus/index'


type LogProps = DatabaseState
var num:number = 1 //序号
//数据入库组件
export default class Log extends React.Component<LogProps, any> {
  log: HTMLDivElement

  render() {
    const logStyle = style(
      {
        height: '100%',
        width: '100%',
        background: 'white',
      
      borderRadius: '7px',
      boxShadow: '0px 0px 5px',
      padding: '2%',
        fontSize: '12px',
        
        overflow: 'auto',
        
      },
      media({minWidth:3800},
        {
          border: 'solid 6px #ECB957',
          borderRadius: '14px',
          fontSize: '30px',
          boxShadow: '10px 10px 20px #333',
        }
      )
    )

    const tableStyle = style({
      border:'solid 1px black',
      borderSpacing: 0,
      position: 'relative',
      width: window.innerWidth>3800?'710px':'100%',
      zIndex: 1,
    })

    const flowStyle = style({
      overflowX: 'hidden',
      overflowY: 'auto',
      height: window.innerWidth>3800?'920px':'85%',
      width: window.innerWidth>3800?'720px':'101%',//为了使出现滑动条以后与表头对齐
      position: 'relative'
    })

    return (
      <div style={{height:'100%',width:'100%'}}>
        <div className={logStyle}>
          <table className={tableStyle}>
            <caption style={{fontSize:window.innerWidth>3800?40:20}}>无人船数据库情况</caption>
            <tr>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'5%',fontSize:window.innerWidth>3800?33:11.5}}>序号</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'5%',fontSize:window.innerWidth>3800?33:11.5}}>速度(m/s)</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'6%',fontSize:window.innerWidth>3800?33:11.5}}>航向角(度)</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'9%',fontSize:window.innerWidth>3800?33:11.5}}>通信链路质量(dBm)</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'9%',fontSize:window.innerWidth>3800?33:11.5}}>完成时间预估(min)</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'5%',fontSize:window.innerWidth>3800?33:11.5}}>电池(%)</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'7%',fontSize:window.innerWidth>3800?33:11.5}}>半径警告(km)</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'5%',fontSize:window.innerWidth>3800?33:11.5}}>ph值</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'6%',fontSize:window.innerWidth>3800?33:11.5}}>电导率(mS/cm)</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'5%',fontSize:window.innerWidth>3800?33:11.5}}>浊度(FNU)</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'5%',fontSize:window.innerWidth>3800?33:11.5}}>溶氧(mg/L)</th>
              <th style={{borderRight:'solid 1px #AAAAAA', width:'16.5%',fontSize:window.innerWidth>3800?33:11.5}}>船体位置经度(度)</th>           
              <th style={{width:'16.5%',fontSize:window.innerWidth>3800?33:11.5}}>船体位置纬度(度)</th>
            </tr>
          </table>
          <div className={flowStyle} ref={(log)=>{this.log=log}}>
          </div>
        </div>
      </div>
    )
  }

  //更新log控件信息
  updateLog() {
    if (!this.log) {
      return
    }
    const id=num
    const speed = this.props.speed
    const angle = this.props.angle
    const communicate = this.props.communicate
    const time = this.props.time
    const battery = this.props.battery
    const radius = this.props.radius
    const ph = this.props.ph
    const conductivity = this.props.conductivity
    const turbidity = this.props.turbidity
    const oxygen = this.props.oxygen
    const lng = this.props.lng
    const lat = this.props.lat
    
    const substring = this.log.innerHTML.substring(0, this.log.innerHTML.length-8)

    //更新表格数据
    this.log.innerHTML = substring+`<tr style="border-bottom:solid 1px #AAAAAA;height:20%">
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:${window.innerWidth>3800?'11%':'5%'}">${id}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:${window.innerWidth>3800?'13%':'5%'}">${speed}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:${window.innerWidth>3800?'16%':'6%'}">${angle}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:${window.innerWidth>3800?'16%':'9%'}">${communicate}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:9%">${time}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:5%">${battery}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:7%">${radius}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:5%">${ph}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:6%">${conductivity}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:5%">${turbidity}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:5%">${oxygen}</td>
                            <td align="center" style="border-right:solid 1px #AAAAAA;width:16.5%">${lng}</td>
                            <td align="center" style="width:16.5%">${lat}</td>
                          </tr>
                        </table>`
    this.log.scrollTop = this.log.scrollHeight
  }

  componentDidMount() {
    this.log.innerHTML = `<table style="border:solid 1px #AAAAAA;border-collapse:collapse;width:${window.innerWidth>3800?'710px':'100%'};table-layout:fixed">
                          </table>`
    setInterval(() => {
      this.updateLog()
      num++
    }, 3000)
  }
}
