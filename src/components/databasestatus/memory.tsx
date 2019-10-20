import * as React from 'react'
import {style , media } from 'typestyle'

import ReactEcharts from 'echarts-for-react'

interface MemoProps{

}

export default class Memoryer extends React.Component<MemoProps , any>{

    getOption(){
        return {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}"
            },
            title:{
                text:'Memory Load',
                left:'center',
                textStyle:{
                    color:'white'
                }
            },
            series: [{
                //类型
                type: 'gauge',
                //半径
                radius: 70,
                //起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
                startAngle: 180,
                //结束角度。
                endAngle: 0,
                center: ['50%', '90%'],
                //仪表盘轴线相关配置。
                axisLine: {
                    show: true,
                    // 属性lineStyle控制线条样式
                    lineStyle: {
                        width: 30,
                        color: [
                            [0.4, '#36ce9b'],
                            [1, '#576d85']
                        ]
                    }
                },
                //分隔线样式。
                splitLine: {
                    show: false,
                },
                //刻度样式。
                axisTick: {
                    show: false,
                },
                //刻度标签。
                axisLabel: {
                    show: false,
                },
                //仪表盘指针。
                pointer: {
                    //这个show属性好像有问题，因为在这次开发中，需要去掉指正，我设置false的时候，还是显示指针，估计是BUG吧，我用的echarts-3.2.3；希望改进。最终，我把width属性设置为0，成功搞定！
                    show: false,
                    //指针长度
                    length: '90%',
                    width: 0,
                },
                //仪表盘标题。
                title: {
                    show: true,
                    offsetCenter: [0, '-15%'], // x, y，单位px
                    textStyle: {
                        color: 'white',
                        fontSize: 16
                    },
                    text:'Memory Load'
                },
                //仪表盘详情，用于显示数据。
                detail: {
                    show: false,
                    offsetCenter: [0, '-10%'],
                    formatter: '{value}',
                    textStyle: {
                        fontSize: 12
                    }
                },
                data: [{
                    value: 16,
                    name: '16%',
                }]
            }]
        }
    }

    render(){

        const wholeStyle = style({
            width:'100%',
            height:'100%'
        })

        return(
            <div className = {wholeStyle}>
                <ReactEcharts option = {this.getOption()} style={{height:'110px' , width:'280px'}} />
            </div>
        )
    }


}