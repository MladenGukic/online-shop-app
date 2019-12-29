<template>
  <div>
    <AppSearch @search-term-updated="onSearchTermChanged" />
    <table class="table">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" v-for="(shopsPage, index) in shopsPages" :key="index">
            <span class="page-link" v-if="shopsPage === pages.current_page">
              {{shopsPage}}
              <span class="sr-only">(current)</span>
            </span>
            <a class="page-link" v-else @click="chosePage(name, shopsPage)">{{shopsPage}}</a>
          </li>
        </ul>
      </nav>
      <thead class="thead-dark">
        <tr>
          <th>Logo</th>
          <th scope="col">Shop</th>
          <th scope="col">Manager</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shop in shops" :key="shop.id">
          <td>
            <img :src="shop.logoUrl" class="img-thumbnail" height="70" width="70" />
          </td>
          <td>
            <a class="link-streched" @click="navigateToShop(shop.id)">{{shop.name}}</a>
          </td>
          <td v-if="shop.manager">
            <a
              class="link-streched"
              @click="navigateToManager(shop.manager.id)"
            >{{shop.manager.first_name + ' ' + shop.manager.last_name}}</a>
          </td>
          <td v-else>No Manager</td>
        </tr>
      </tbody>
    </table>
    <h4 v-if="shops.length < 1">No shops</h4>
  </div>
</template>

<script>
// @ is an alias to /src
import AppSearch from "./AppSearch";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "shops",
  components: {
    AppSearch
  },

  computed: {
    ...mapGetters({
      shops: "shops",
      pages: "pages",
      name: "name"
    }),

    shopsPages() {
      let shopArray = [];
      for (var i = 1; i <= this.pages.last_page; i++) {
        shopArray.push(i);
      }
      return shopArray;
    }
  },

  methods: {
    ...mapActions({
      fetchShops: "fetchShops"
    }),

    onSearchTermChanged(term) {
      this.fetchShops({ name: term, page: this.currentPage });
    },

    navigateToManager(id) {
      this.$router.push({
        name: "manager",
        params: { id }
      });
    },

    navigateToShop(id) {
      this.$router.push({
        name: "shop",
        params: { id }
      });
    },

    chosePage(name, page) {
      this.fetchShops({ name: name, page: page });
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetchShops(name));
  }
};
</script>

<style>
.image-parent {
  display: flex;
}
</style>
