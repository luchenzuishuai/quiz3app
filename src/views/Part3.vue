/* Name: Chen Lu
Id: 91906
course number: 2228-CSE-6331-980
lab: Assignment3 */
<template>
  <div>
    <el-divider></el-divider>
    <div class='ques1'>
      <!--  search for magnitude greater than 5.0 -->
      <div style="display: flex; flex-direction: column">
        <span class="ques">✅ Ques12: Repeat part b, from question 10, and show a pie chart which has labels either inside or outside each pie slice, and whichoccupies about 70% to 90% of the screen.</span>
      </div>
    </div>
    <el-divider></el-divider>
     <el-input v-model="store1" placeholder="first store" style="width: 150px"></el-input>
        <el-input v-model="store2" placeholder="second store" style="width: 150px"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="clickFn">Get Data</el-button>
    <!-- graph area -->
    <!-- The width and height of the area corresponding to the echarts must be given, otherwise it will not be loaded -->
    <div v-loading="loading" ref="graph" key="1" class="graph"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import { PieChart, BarChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  PieChart,
  CanvasRenderer,
  LabelLayout
])
export default {
  async mounted () {
    // 在created中获取数据，没有成功渲染到echarts方法解决
    // 解决方法：在mounted中去拿数据，等数据获取完了，才去渲染
    await this.getDataList()
    // 元素挂载与渲染到dom树上完毕。页面渲染完毕时，去获取实例；created阶段只是实例创建完毕，页面并没有渲染完毕
    this.drawPie()
  },
  data () {
    return {
      dataList: [],
      loading: false,
      store1: 2,
      store2: 4,
      type: false
    }
  },
  methods: {
    async clickFn () {
      await this.getDataList()
      this.drawPie()
    },
    async getDataList () {
      this.loading = true
      // get quake data[0-1]、[1-2]、[2-3]、[3-4]、[4-5]
      const { data } = await this.$http.get('quiz2/fetchQ10b', {
        params: {
          store1: this.store1,
          store2: this.store2
        }
      })
      this.dataList = data.map(item => {
        const obj = {
          name: item.store,
          value: item.num
        }
        return obj
      })
      console.log(this.dataList)
      this.drawPie()
      this.loading = false
    },
    drawPie () {
      const mychart = echarts.init(this.$refs.graph)
      const option = {
        title: {
          text: 'Distribution of food quantity in stores Graph',
          subtext: 'Tip: Place the mouse on the graph to display the quantity',
          left: 'center'
        },
        tooltip: {
          position: 'top'
        },
        legend: {
          orient: 'vertical',
          left: '20%'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '60%',
            // data: [
            //   { value: 1048, name: 'Search Engine' },
            // ],
            data: this.dataList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      mychart.setOption(option)
      this.$message.success('Loading succeeded~')
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
