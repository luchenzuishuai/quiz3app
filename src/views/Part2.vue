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
        <span class="ques">✅ Ques11: Search for those individual characters and display the count of each of those characters and the offset (location) for the first
          occurance. </span>
        <span class="tip">Tip：Text field highly adaptive</span>
      </div>
    </div>
    <el-divider></el-divider>
    <el-row type="flex" justify="space-around" align="middle">
      <el-input type="textarea" autosize placeholder="input text" v-model="text" style="width:40%">
      </el-input>
      <el-input type="textarea" autosize placeholder="input characters" v-model="characters" style="width:20%">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="clickFn">Search</el-button>
    </el-row>

    <!-- 结果显示 -->
    <el-table v-loading="loading" :data="dataList" style="width: 100%">
      <el-table-column prop="character" label="character" align="center">
      </el-table-column>
      <el-table-column prop="firstOccurrence" label="firstOccurrence"  align="center">
      </el-table-column>
      <el-table-column prop="times" label="times"  align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [],
      loading: false,
      text: '',
      characters: ''
    }
  },
  methods: {
    async clickFn () {
      this.loading = true
      const fd = new FormData()
      fd.append('text', this.text)
      fd.append('characters', this.characters)
      const { data } = await this.$http.post('/quiz3/findLocationOfCharacter', fd)
      this.dataList = data
      console.log(data)
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
