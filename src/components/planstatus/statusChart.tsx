
import * as React from 'react'
import {style,media} from 'typestyle'
import echarts from 'echarts/dist/echarts.common';
import ReactEcharts from 'echarts-for-react'
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

interface StatusChartProps {
  name:string
  unit:string
  data:number
}

// var base = +new Date(1968, 9, 3);
// var oneDay = 24 * 3600 * 1000;
// var date = [];

// var data = [Math.random() * 300];

// for (var i = 1; i < 20000; i++) {
//     var now = new Date(base += oneDay);
//     date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
//     data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
// }

function getTime (){
    var now = new Date();
    var res = [];
    // var len = timenum;
    res.push(now.toLocaleTimeString());
    return res;
}

//仿echarts雨量流量关系图组件 
//var  StatusChart = echarts.init(document.getElementById('main'));
export default class StatusChart extends React.Component<StatusChartProps, any> {
  div: HTMLDivElement
  SeriesData :Array<number> = [0]
  timeData: Array<any> = [0]
  getOption() {
      this.updateData()
    return{
      grid:
        {
          top:'30px', 
          left:'40px',
          bottom:'25px',
          right:'0px',
          show: false
        },
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
          return [pt[0], '10%'];
      }
  },
  title: {
      left: 'center',
      text: this.props.name + '曲线图',
  },

  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: this.timeData
  },
  yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
  },
  dataZoom: [{
      type: 'inside',
    //   start: 0,
    //   end: 10
  }, {
    //   start: 0,
    //   end: 10,
    //   handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
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
      this.getSeriesData()
  ]
};
  }

    updateData(){
        this.SeriesData.push(this.props.data);
        if(this.SeriesData.length > 10){
            this.SeriesData.shift()
        }
        this.timeData.push(getTime());
    }

    getSeriesData(){
        return {
            name:this.props.name,
            type:'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                normal: {
                    color: 'rgb(255, 70, 131)'
                }
            },
            /*areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    }, {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }])
                }
            },*/
            data: this.SeriesData
        }
    }

            render() {
              const wholeStyle = style(
                {
                  height: '100%',
                  width: '100%',
                  zIndex: 3,
                }
              )
              return (
                <div className={wholeStyle}>
                  <ReactEcharts option={this.getOption()} style={{height:'200px', width:'250px',background:'blue'}}/>
                </div>
              )
          }
        }
      
