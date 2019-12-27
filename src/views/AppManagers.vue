<template>
  <div>
    <AppSearch @search-term-updated="onSearchTermChanged"/>
    <button class="btn btn-info" @click="navigateToAddManager"> Add manager </button> 
    <table class="table">
  <thead class="thead-dark white-text">
    <tr>
      <th scope="col">Manager</th>
      <th scope="col">Full Name</th>
      <th scope="col">Shop</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(manager,index) in managers" :key="index">
      <th><img :src="manager.imageUrl"></th>
      <td>
        <h1><a @click="navigateToSingleManager(manager.id)" class="badge badge-info">{{manager.first_name + ' ' + manager.last_name}}</a></h1>
      </td>
      <td v-if="manager.shop">
        <h1><a @click="navigateToSingleShop(manager.shop.id)" class="badge badge-info">{{manager.shop.name}}</a></h1>
      </td>
      <td v-else>
        Manager is aviable
      </td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import AppSearch from './AppSearch'
import {mapGetters, mapActions} from 'vuex'
export default {
  components: {
    AppSearch
  },

  computed: {
    ...mapGetters({
        managers: 'managers'
    }),
  },

  methods: {
    ...mapActions({
      fetchManagers: 'fetchManagers',
    }),

    navigateToSingleManager(id) {
      this.$router.push({
        name: 'manager',
        params: {id}
      })
    },

    navigateToSingleShop(id) {
      this.$router.push({
        name: 'shop',
        params: {id}
      })
    },

    onSearchTermChanged(term) {
      this.fetchManagers(term)
    },

    navigateToAddManager() {
      this.$router.push({
        name: 'addManager'
      })
    }
  },

  beforeRouteEnter(to,from,next) {
    next(vm => vm.fetchManagers())
  }
}
</script>
<style>

</style>