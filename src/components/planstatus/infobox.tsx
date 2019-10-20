
import * as React from 'react'
import {style,media} from 'typestyle'
import StatusChart from './statusChart'

interface InfoBoxProps {
  selected:string//需要显示的项目
  name:string
  unit:string
  data:number
}

//弹框
export default class InfoBox extends React.Component<InfoBoxProps, any> {

  render() {
    let InfoBoxBlockStyle = style({
      position:'absolute',
      width:'100%',
      height:'100%',
      display:this.props.selected==this.props.name?'inline':'none',
      zIndex:1,
    })
    
    const ChartStyle = style({
      zIndex:2,
      width:'88%',
      height:'96%',
      position:'absolute',
      top:'2%',
      left:'3%'
    })
    return (
      <div className={InfoBoxBlockStyle}>
        <svg style={{width:'100%',height:'100%'}}>
          <rect x='1%' y='1%'width="88%" height="98%" rx="20" ry="20" fill='white'strokeWidth='3'></rect>

        </svg>
        <div className={ChartStyle}><StatusChart name={this.props.name} unit={this.props.unit} data={this.props.data}/></div>
      </div>
    )
  }
}
/*
// 引入 ECharts 主模块
import echarts from 'echarts/dist/echarts.common';
// 引入折线图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

interface InfoBoxProps {
  selected:string//需要显示的项目
  name:string
  unit:string
  data:number
}

export default class InfoBox extends React.Component<InfoBoxProps, any> {
    componentDidMount() {
        var base = +new Date(1968, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];

        var data = [Math.random() * 300];

        for (var i = 1; i < 20000; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }
        // 基于准备好的dom，初始化echarts实例
        var StatusChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        StatusChart.setOption({
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '大数据量面积图',
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name:'模拟数据',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        }
                    },
                    data: data
                }
            ]
        });
    }
    render() {
        return (
            <div id="main" style={{ width: 500, height: 500}}></div>
        );
    }
}*/