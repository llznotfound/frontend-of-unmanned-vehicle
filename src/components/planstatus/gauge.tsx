import * as React from 'react'
import * as Redux from 'redux'
import {style,media} from 'typestyle'
import {Button} from 'antd'
import ReactEcharts from 'echarts-for-react'
import {changeItemAction} from '../../models/planstatus/showItem'

interface GaugeProps {
  min: number
  max: number
  value: number
  name: string
  unit:string
  dispatch: Redux.Dispatch<any>
}

export default class Gauge extends React.Component<GaugeProps, any> {

  div: HTMLDivElement
  button: HTMLDivElement

  getOption() {
    return {
      tooltip : {
        formatter: "{a} <br/>{b} : {c}"
      },

      series: [
        {
          top:'-10px',
          radius: '70%',
          axisLine: {  
            lineStyle: {  
                width: 5 // 这个是修改宽度的属性  
            }  
        },  
        axisLabel: {
          show: false,
          textStyle: {
              color: '#000',
              fontSize: 7,
          }
      },
          //splitNumber: 18,
          //min: this.props.min,
          //max: this.props.max,
          type: 'gauge',
          title: {
            offsetCenter: [0, '-30%'],
            textStyle: {
              color: '#0F0F0F',
              fontSize: 20
            }
          },
          detail: {
            formatter:`{value}` + this.props.unit,
            offsetCenter: [0, '30%'],
            textStyle: {
              color: 'black',
              fontSize: 33
            }
          },
          data: [{value: this.props.value, name: this.props.name}],

         
          
            }
          
        
      ]
    }
  }
//处理显示项改变动作
  handleClick() {
    this.props.dispatch(changeItemAction(this.props.name))
    // console.log("test")
  }


  render() {
    const wholeStyle = style(
      {
        height: '100%',
        width: '100%',
        // margin: 'auto'
      }
    )

    // const buttonStyle = style(
    //   {
    //     position: 'relative',
    //     top: '-45px',
    //     left:'-18px',
    //     paddingLeft: '5px',
    //     width: '68px',
        
    //     height: '18px',
    //     fontSize: '12px',
    //     color: 'white',
    //     borderRadius: '5px',
    //     background: '#009F8D',
    //     border: '#009F8D',
    //     $nest: {
    //       '&:hover': {
    //         color: 'white',
    //         background: '#4FABEE',
    //       }
    //     },
    //     zoom:2.0
    //   }
    // )



    return (
      <div  className={wholeStyle} onClick={()=>this.handleClick()} >
        {}
        <ReactEcharts option={this.getOption()} style={{width:'300px' , height:'300px'}} />
        {/* <div className={divStyle}>
          <Button className={buttonStyle} type="primary" onClick={()=>{this.handleClick()}}>查看曲线图</Button>
        </div> */}
      </div>
    )
  }
}
