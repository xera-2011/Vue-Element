const express = require('express')
const app = express()
//允许跨域
app.use(require('cors')())
//识别客户端提交过来的json数据
app.use(express.json())
//链接数据库，没有则会默认创建
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/element-admin', {
  useNewUrlParser: true,
  userFindAndModify: true,
  userCreaateIndex: true
})
// 数据操作模型(数据模型) mongoose.model建立模型
const Article = mongoose.model('Article', new mongoose.Schema({
  // 每一个数据都要有自己的数据类型
  title: { type: String },//文章标题
  body: { type: String }//文章内容
}))

app.get('/', async (req, res) => {
  res.send('index')
})

// 新增文章接口 
// 1.因为要提交数据 所以要post(articles一般都用负数)
app.post('/api/articles', async (req, res) => {
  // 2.在Article中create创建,数据就来自于req.body
  const article = await Article.create(req.body)
  // 3.创建完之后,发送数据(文章)回前端
  res.send(article)
})

// 获取文章列表
// 1.获取文章信息,在页面的文章列表遍历
app.get('/api/articles', async (req, res) => {
  // 2.在Article中find查找数据
  const articles = await Article.find()
  // 3.找到后,发送数据回前端
  res.send(articles)
})

// 删除文章
// 1.根据文章id 删除,需要传入
app.delete('/api/articles/:id', async (req, res) => {
  // 2.在Article中findByIdAndDelete找到对应ID并删除(客户端请求url中的id)
  await Article.findByIdAndDelete(req.params.id)
  // 3.返回客户端true 表示删除成功
  res.send({
    status: true
  })
})

// 获取需要修改的文章
// 1.获取需要修改的文章内容
app.get('/api/articles/:id', async (req, res) => {
  // 2.按照传入的id获取需要修改的文章---后台路由的id---req.params.id
  const article = await Article.findById(req.params.id)
  // 3.返回对应id文章
  res.send(article)
})
// 修改文章 
// 1.遵循修改规范,要使用put(虽说post也行,但不易区分)
app.put('/api/articles/:id', async (req, res) => {
  // 2.找到对应id文章修改,需要两个传参,一个id(修改哪个),一个req请求体(修改什么)
  const article = await Article.findByIdAndUpdate(req.params.id, req.body)
  // 3.修改完之后,发送数据(文章)回前端
  res.send(article)
})

app.listen(3001, () => {
  console.log('http://localhost:3001/')
})