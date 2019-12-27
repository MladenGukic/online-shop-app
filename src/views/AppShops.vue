<template>
  <div>
    <AppSearch @search-term-updated="onSearchTermChanged"/>
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th>Logo</th>
      <th scope="col">Shop</th>
      <th scope="col">Manager</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="shop in shops" :key="shop.id">
      <td><img :src="shop.logoUrl"></td>
      <td><a class="link-streched" @click="navigateToShop(shop.id)">{{shop.name}}</a></td>
      <td v-if="shop.manager">
        <a class="link-streched" @click="navigateToManager(shop.manager.id)">
          {{shop.manager.first_name + ' ' + shop.manager.last_name}}
        </a>
      </td>
      <td v-else> No Manager </td>
    </tr>
  </tbody>
</table>

</div>
</template>

<script>
// @ is an alias to /src
import AppSearch from './AppSearch'
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'shops',
  components: {
    AppSearch
  },

  computed: {
    ...mapGetters({
      shops: 'shops',
    }),
  },

  methods: {
    ...mapActions({
      fetchShops: 'fetchShops',
    }),

    onSearchTermChanged(term) {
      this.fetchShops(term)
    },

    navigateToManager(id) {
      this.$router.push({
        name: 'manager',
        params: {id}
      })
    },

    navigateToShop(id) {
      this.$router.push({
        name: 'shop',
        params: {id}
      })
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetchShops())
  }
}
</script>

<style>
.image-parent {
  display: flex;
}
</style>
