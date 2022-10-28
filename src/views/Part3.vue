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
        <span class="ques">✅ Ques12:  Count the total number words and count for each individual word. Then count the number of word pairs that occur more than one time.</span>
        <span class="tip">Tip：Text field highly adaptive</span>
      </div>
    </div>
    <el-divider></el-divider>
     <el-row type="flex" justify="space-around" align="middle">
      <el-input type="textarea" autosize placeholder="input text" v-model="text" style="width:40%">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="clickFn">Search</el-button>
    </el-row>

    <!-- 结果显示 -->
    <h3>Result 1-word</h3>
    <el-table v-loading="loading" :data="data1List" style="width: 100%">
      <el-table-column prop="words" label="words" align="center">
      </el-table-column>
      <el-table-column prop="occurrenceTimes" label="occurrenceTimes"  align="center">
      </el-table-column>
    </el-table>

    <h3>Result 2-word pairs</h3>
    <el-table v-loading="loading" :data="data2List" style="width: 100%">
       <el-table-column prop="words" label="words" align="center">
      </el-table-column>
      <el-table-column prop="occurrenceTimes" label="occurrenceTimes"  align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data1List: [],
      data2List: [],
      loading: false,
      text: ''
    }
  },
  methods: {
    async clickFn () {
      this.data1List = []
      this.data2List = []
      this.loading = true
      const fd = new FormData()
      fd.append('text', this.text)
      const { data } = await this.$http.post('/quiz3/fetchAnswerOfQ12', fd)
      this.data1List = data.wordAndOccurrenceTimes
      this.data2List = data.wordPairAndOccurrenceTimes
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
