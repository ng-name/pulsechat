import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'), // 路由懒加载
    meta: { title: '首页' }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/Chat.vue'),
    meta: { title: '对话' },
  },
  // 如果有登录页
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '会员' },
    redirect: '/login/signin',
    children: [
        {
            path: 'signin',
            name: 'LoginSignin',
            component: () => import('@/views/login/Signin.vue'),
            meta: { title: '登录' }
        },
        {
            path: 'signup',
            name: 'LoginSignup',
            component: () => import('@/views/login/Signup.vue'),
            meta: { title: '注册' }
        },
        {
            path: 'forgot',
            name: 'LoginForgot',
            component: () => import('@/views/login/Forgot.vue'),
            meta: { title: '找回密码' }
        },
    ]
  },
   {
    path: '/docs',
    name: 'Docs',
    component: () => import('@/views/Docs.vue'),
    meta: { title: '文档' },
    redirect: '/docs/useragreement',
    children: [
        {
            path: 'useragreement',
            name: 'UseragReement',
            component: () => import('@/views/docs/UseragReement.vue'),
            meta: { title: '用户协议' }
        },
        {
            path: 'privacypolicy',
            name: 'PrivacyPolicy',
            component: () => import('@/views/docs/PrivacyPolicy.vue'),
            meta: { title: '隐私条款' }
        },
    ]
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/Chat.vue'),
    meta: { title: '聊天' },
  },
  {
    path: '/other',
    name: 'Other',
    component: () => import('@/views/Other.vue'),
    meta: { title: '其他' },
    redirect: '/other/about',
    children: [
        {
            path: 'about',
            name: 'About',
            component: () => import('@/views/other/About.vue'),
            meta: { title: '关于我们' }
        },
        {
            path: 'feedback',
            name: 'Feedback',
            component: () => import('@/views/other/Feedback.vue'),
            meta: { title: '反馈意见' }
        },
        {
            path: 'faqs',
            name: 'FAQs',
            component: () => import('@/views/other/FAQs.vue'),
            meta: { title: '反馈意见' }
        },
    ]
  },
  {
    path: '/model',
    name: 'Model',
    component: () => import('@/views/Model.vue'),
    meta: { title: '模型' },
    redirect: '/model/gettingstarted',
    children: [
        {
            path: 'gettingstarted',
            name: 'GettingStarted',
            component: () => import('@/views/model/GettingStarted.vue'),
            meta: { title: '入门介绍' }
        },
        {
            path: 'accessingapi',
            name: 'AccessingAPI',
            component: () => import('@/views/model/AccessingAPI.vue'),
            meta: { title: '接入API' }
        },
        {
            path: 'qslimitations',
            name: 'QSLimitations',
            component: () => import('@/views/model/QSLimitations.vue'),
            meta: { title: '限制QS' }
        },
        {
            path: 'pricingreference',
            name: 'PricingReference',
            component: () => import('@/views/model/PricingReference.vue'),
            meta: { title: '价格参考' }
        },
    ]
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router