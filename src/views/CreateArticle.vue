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
      <el-button type="primary" native-type="submit">立即创建</el-button>
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
    saveArtical() {
      // 1.因为已经封装好了$http,这里的路径可以简写
      // 2.this.article就是post的请求体,里面包含了标题和内容
      this.$http.post("articles", this.article).then(res => {
        // 3.使用element弹出提示框
        this.$message({
          message: "文章创建成功!",
          type: "success"
        });
        // 4.弹出框之后 将页面跳转至文章列表页面
        this.$router.push("/articles/index");
      });
      // 5.最后在放在form标签上触发,注意:记得给'立即创建'这个按钮添加native-type="submit"
    }
  }
};
</script>