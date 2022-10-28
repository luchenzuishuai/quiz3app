/* Name: Chen Lu
Id: 91906
course number: 2228-CSE-6331-980
lab: Assignment3 */
<template>
  <div class="container">
    <el-divider></el-divider>

    <div class='ques1'>
      <!--  search for magnitude greater than 5.0 -->
      <div style="display: flex; flex-direction: column">
        <span class="ques">✅ Ques2: For the data set p, please show a point chart (scatter chart, x/y chart) that occupies about half (50%) of the screen width and height with labels on each axis, where each point has the color "r" (red) or "g" (green).</span>
        <span class="tip">Additional-1：Allow a user to add additional points or change the x,y, or color attribute of an existing point. </span>
        <span class="tip">Tip： Click the point to change the color</span>
      </div>
    </div>
    <el-divider></el-divider>
    <el-row type="flex" justify="end">
      <el-switch v-model="type" active-text="style2" inactive-text="style1" @change="change"></el-switch>
    </el-row>
    <div v-loading="loading" ref="graph" key="1" class="graph"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { GridComponent, TitleComponent } from 'echarts/components'
import { ScatterChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, TitleComponent, ScatterChart, CanvasRenderer, UniversalTransition])
export default {
  async mounted () {
    await this.getDataList()
    // 元素挂载与渲染到dom树上完毕。页面渲染完毕时，去获取实例；created阶段只是实例创建完毕，页面并没有渲染完毕
    this.drawXYScatter()
  },
  data () {
    return {
      data1List: [],
      data2List: [],
      loading: false,
      type: false
    }
  },
  methods: {
    async getDataList () {
      this.loading = true
      const { data } = await this.$http.get('/quiz2/fetchAllPoint')
      // console.log(data)
      this.data1List = data.map(item => [item.x, item.y, item.color])
      this.data2List = data.map(item => [item.y, item.x, item.color])
      // this.dataList = data.map(item => [item.x, item.y])
      console.log(this.data1List)
      this.loading = false
    },
    drawXYScatter () {
      const mychart = echarts.init(this.$refs.graph)
      const option = {
        title: {
          text: 'Scatter Map',
          left: 'center'
        },
        xAxis: {
          name: 'x'
        },
        yAxis: {
          name: 'y'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            symbolSize: 20,
            // data: [
            //   [10.0, 8.04],
            // ],
            data: this.data1List,
            itemStyle: {
              normal: {
                color: function (param) {
                  if (param.data[2] === 'r') {
                    return 'red'
                  }
                  if (param.data[2] === 'g') {
                    return 'green'
                  }
                }
              }
            },
            type: 'scatter'
          }
        ]
      }
      mychart.setOption(option)
      const that = this
      mychart.on('click', function (params) {
        console.log(params)
        that.editColor(params.data) // [4, 4, 'g']
      })
      this.$message.success('Loading succeeded~')
    },
    async editColor (data) {
      let obj = {}
      if (!this.type) {
        // xy
        obj = {
          modifiedPoint: {
            color: data[2] === 'r' ? 'g' : 'r',
            x: data[0],
            y: data[1]
          },
          originalPoint: {
            color: data[2],
            x: data[0],
            y: data[1]
          }
        }
      } else {
        // yx
        obj = {
          modifiedPoint: {
            color: data[2] === 'r' ? 'g' : 'r',
            x: data[1],
            y: data[0]
          },
          originalPoint: {
            color: data[2],
            x: data[1],
            y: data[0]
          }
        }
      }
      await this.$http.post('/quiz2/modifyPoint', obj)
      await this.getDataList()
      this.type ? this.drawYXScatter() : this.drawXYScatter()
    },
    drawYXScatter () {
      const mychart = echarts.init(this.$refs.graph)
      const option = {
        title: {
          text: 'Scatter Map',
          left: 'center'
        },
        xAxis: {
          name: 'y'
        },
        yAxis: {
          name: 'x'
        },
        series: [
          {
            symbolSize: 20,
            // data: [
            //   [10.0, 8.04],
            // ],
            data: this.data2List,
            itemStyle: {
              normal: {
                color: function (param) {
                  if (param.data[2] === 'r') {
                    return 'red'
                  }
                  if (param.data[2] === 'g') {
                    return 'green'
                  }
                }
              }
            },
            type: 'scatter'
          }
        ]
      }
      mychart.setOption(option)
      this.$message.success('Loading succeeded~')
    },
    change () {
      this.type ? this.drawYXScatter() : this.drawXYScatter()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  margin-top: 15px;
  .head {
    display: flex;
    .el-alert {
      margin-right: 200px;
      /deep/ .el-alert__title {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}
.ques {
  color: red;
  font-weight: 700;
  font-size: 18px;
}

.tip {
  color: #66d9ef;
  font-weight: 700;
}

.graph {
  height: 600px;
}
</style>
