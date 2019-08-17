<template>
  <div class="home">
    <el-table :data="articles">
      <el-table-column prop="title" label="标题" width="140"></el-table-column>
      <el-table-column prop="body" label="内容" width="220"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- scope.row里面有对应的文章id,通过id 删改文章.可以{{scope.row}}查看里面的参数 -->
          <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: []
    };
  },
  methods: {
    // 获取文章
    fetch() {
      // 1.获取文章
      this.$http.get("articles").then(res => {
        // 2.将文章数据传入这个页面,注意要将上面的prop字段定义成articles里的
        this.articles = res.data;
      });
    },

    // 删除文章(需要id)
    remove(id) {
      // 1.delete是在后台定义的,注意 这里要用``ES6的模板字符串,因为里面有${}变量
      this.$http.delete(`articles/${id}`).then(res => {
        // 2.删除后弹窗成功
        this.$message({
          message: "文章删除成功!",
          type: "success"
        });
        // 3.成功后 重新获取文章,不然列表不会更新
        this.fetch();
      });
    },

    // 编辑文章(需要id,且跳转到一个编辑页面)
    edit(id) {
      this.$router.push(`/articles/${id}/edit`);
    }
  },
  created() {
    this.fetch();
  }
};
</script>
