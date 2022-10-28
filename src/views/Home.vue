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
        <span class="ques">✅ Ques10: count the number of characters entered and display the count. </span>
        <span class="tip">Tip：Text field highly adaptive</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <el-row type="flex" justify="space-around" align="middle">
        <el-input type="textarea" autosize placeholder="input text" v-model="text" style="width:40%">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="clickFn">Calculate</el-button>
      </el-row>
      <div v-loading="loading">
        <h1 style="margin-top: 30px">The number of characters is: <span style="color: red">{{count}}</span></h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted () {

  },
  data () {
    return {
      count: 0,
      text: '',
      dataList: [],
      data2List: [],
      loading: false
    }
  },
  methods: {
    async clickFn () {
      this.loading = true
      const { data } = await this.$http.post('/quiz3/countCharacterNumberOfString?text=' + this.text)
      this.count = data.characterNumber
      this.loading = false
      this.$message.success('Loading succeeded')
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
