import Vue from 'vue'
import Vuex from 'vuex'
import { AuthModule } from './AuthStore'
import { ManagerModule } from './ManagerStore'
import { ShopModule } from './ShopStore'
import { ArticleModule } from './ArticleStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    AuthModule,
    ManagerModule,
    ShopModule,
    ArticleModule
  }
})
