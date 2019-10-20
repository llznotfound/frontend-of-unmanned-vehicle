import * as React from 'react'
import {style,media} from 'typestyle'

interface LogProps {
    ph:number//ph值
    nh3h:number//氨氮
    turbidity:number//浊度
    oxygen:number//溶氧  
}

//获取格式化的当前时间
export const getTime = () => {
  const date = new Date()
  return `${date.getHours()<10?'0'+date.getHours():date.getHours()}:
          ${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}:
          ${date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()}`
}

//数据入库组件
export default class Log extends React.Component<LogProps, any> {
  log: HTMLDivElement

  render() {
    const logStyle = style(
      {
        height: '100%',
        width: '100%',
        fontSize: '12px',
        overflow: 'auto',
        padding: '7% 10%',
        opacity: 0.98
      }
    )

    return (
      <div style={{height:'100%',width:'100%'}}>
        
        <div className={logStyle} ref={(log)=>{this.log = log}}>
            时间：{getTime()}<br />
            ph：{this.props.ph}，
            氨氮：{this.props.nh3h}S/m<br />
            浊度：{this.props.turbidity}FTU<br />
            溶氧：{this.props.oxygen}mg/L<br />
            </div>
      </div>
    )
  }
}
