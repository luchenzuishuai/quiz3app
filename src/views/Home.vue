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
        <span class="ques">✅ Ques1: For the data set f a user will select a range of stores and you will display a vertical bar chart where each bar represents the the total amount of each food in all stores, </span>
        <span class="tip">Tip-1：Default: store2-store4.You can reset </span>
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <el-row type="flex" justify="end" align="middle">
        <el-input v-model="store1" placeholder="first store" style="width: 150px"></el-input>
        <el-input v-model="store2" placeholder="second store" style="width: 150px"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="clickFn">Get Data</el-button>
        <el-switch v-model="type" active-text="show b" inactive-text="show a" @change="change"></el-switch>
      </el-row>
    </div>
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
    this.drawVerticalBar()
  },
  data () {
    return {
      dataList: [],
      data2List: [],
      loading: false,
      type: false,
      store1: 2,
      store2: 4
    }
  },
  methods: {
    async clickFn () {
      await this.getDataList()
      this.type ? this.draHorizontalBar() : this.drawVerticalBar()
    },
    async getDataList () {
      this.loading = true
      // get quake data[0-1]、[1-2]、[2-3]、[3-4]、[4-5]
      const { data: data1 } = await this.$http.get('/quiz2/fetchQ10a', {
        params: {
          store1: this.store1,
          store2: this.store2
        }
      })
      this.dataList = data1
      const { data: data2 } = await this.$http.get('quiz2/fetchQ10b', {
        params: {
          store1: this.store1,
          store2: this.store2
        }
      })
      this.data2List = data2
      console.log(this.data2List)
      this.loading = false
    },
    drawVerticalBar () {
      const mychart = echarts.init(this.$refs.graph)
      // data-y
      const dataY = this.dataList.map(item => item.num)
      const dataX = this.dataList.map(item => item.food)
      const option = {
        xAxis: {
          name: 'food',
          type: 'category',
          data: dataX
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          name: 'number',
          type: 'value'
        },
        series: [
          {
            data: dataY,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
      mychart.setOption(option)
      this.$message.success('Loading succeeded~')
    },
    change (val) {
      val ? this.draHorizontalBar() : this.drawVerticalBar()
    },
    draHorizontalBar () {
      const mychart = echarts.init(this.$refs.graph)
      // data-y
      const dataX = this.data2List.map(item => item.num)
      const dataY = this.data2List.map(item => item.store)
      console.log(dataY)
      const option = {
        xAxis: {
          name: 'number',
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          name: 'store',
          type: 'category',
          data: dataY

        },
        series: [
          {
            data: dataX,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
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
  font-size: 16px;
}

.tip {
  color: #66d9ef;
  font-weight: 700;
}

.graph {
  height: 600px;
}
</style>
