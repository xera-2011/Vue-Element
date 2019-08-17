<template>
  <el-form @submit.native.prevent="saveArtical" ref="article" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>

    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <!-- @click="onSubmit"把这个去掉,添加一个 -->
      <el-button type="primary" native-type="submit">保存</el-button>
      <el-button @click="$router.push('/articles/index')">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      article: {} //这里使用了v-model的双向绑定
    };
  },
  methods: {
    // 修改文章
    saveArtical() {
      // 1.路由传参为:修改的文章id,和文章内容
      this.$http.put(`articles/${this.$route.params.id}`,this.article).then(res => {
        // 2.使用element弹出提示框
        this.$message({
          message: "文章修改成功!",
          type: "success"
        });
        // 3.弹出框之后 将页面跳转至文章列表页面
        this.$router.push("/articles/index");
      });
      // 4.最后在放在form标签上触发,注意:记得给'立即创建'这个按钮添加native-type="submit"
    },

    // 获取需要编辑的文章
    fetch() {
      // 1.根据路由上的id获取 ---前端路由的id---this.$route.params.id,注意要用${}包裹
      this.$http.get(`articles/${this.$route.params.id}`).then(res => {
        // 2.将获取到的文章传入article
        this.article = res.data;
      });
      // 3.在created中触发
    }
  },
  created() {
    // 编辑页面需要展示 要编辑文章的内容
    this.fetch();
  }
};
</script>