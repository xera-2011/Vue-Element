import Vue from 'vue'
import Router from 'vue-router'
import CreateArticle from './views/CreateArticle.vue'
import ListArticle from './views/ListArticle.vue'
import EditArticle from './views/EditArticle.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/articles/index'
    },
    {
      path: '/articles/index',
      name: 'list-articles',
      component: ListArticle
    },
    {
      path: '/articles/create',
      name: 'create-articles',
      component: CreateArticle
    },
    {
      path: '/articles/:id/edit',//编辑文章,需要传入id,吧edit放在后面,容易识别出这个是编辑页面
      name: 'edit-articles',
      component: EditArticle
    }
  ]
})
