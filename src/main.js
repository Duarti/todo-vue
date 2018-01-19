// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Auth from './helpers/Auth'
import Request from './helpers/Request'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (Auth.userToken() === null || !Auth.userToken()) {
      return next({path: '/login'})
    }
    fetch(Request.REQUEST_URI + '/usuarios/verify', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + Auth.userToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          Auth.isAuthenticated = true
          return next()
        } else {
          return next({path: '/login'})
        }
      })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

// Vue.prototype.$auth = Auth
