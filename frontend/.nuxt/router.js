import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8f5ef1bc = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _15dc033c = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _63be20f3 = () => interopDefault(import('..\\pages\\post\\create.vue' /* webpackChunkName: "pages/post/create" */))
const _31104956 = () => interopDefault(import('..\\pages\\post\\list.vue' /* webpackChunkName: "pages/post/list" */))
const _e74fc56e = () => interopDefault(import('..\\pages\\post\\edit\\_id.vue' /* webpackChunkName: "pages/post/edit/_id" */))
const _22ae37ea = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _8f5ef1bc,
    name: "login"
  }, {
    path: "/auth/register",
    component: _15dc033c,
    name: "auth-register"
  }, {
    path: "/post/create",
    component: _63be20f3,
    name: "post-create"
  }, {
    path: "/post/list",
    component: _31104956,
    name: "post-list"
  }, {
    path: "/post/edit/:id?",
    component: _e74fc56e,
    name: "post-edit-id"
  }, {
    path: "/",
    component: _22ae37ea,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
