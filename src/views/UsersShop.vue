<template>
  <div>
    <div class="jumbotron p-3 p-md-5 text-white rounded bg-dark">
      <div class="row">
        <div class="col">
          <button
            class="btn btn-info col-sm-3 btn-block"
            type="button"
            @click="navigateToAddArticle(shop.id)"
          >Add Article</button>
          <button
            class="btn btn-danger col-sm-3 btn-block"
            type="button"
            @click="onDeleteShop"
          >Delete shop</button>
        </div>
        <div class="w-100"></div>
        <div class="col">
          <img class="picture" v-if="manager.shop" :src="manager.shop.logoUrl" />
          <h1 class="display-4 font-italic" v-if="manager.shop">{{manager.shop.name}}</h1>
          <p
            class="lead my-3"
            v-if="manager.shop"
          >Manager: {{manager.first_name + ' ' + manager.last_name}}</p>
          <ul class="list-group text-left list-inline">
            <h4 v-if="shop.articles !== undefined">Articles</h4>
            <h3 v-else>You don't have any articles</h3>
            <li
              class="list-group-item list-group-item-dark"
              v-for="article in shop.articles"
              :key="article.id"
            >
              <img class="img-thumbnail" height="70" width="70" :src="article.imgUrl.split(',')[0]" />
              {{article.name}} | {{article.content}} | {{article.price}}$
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      manager: "manager",
      shop: "shop"
    })
  },

  methods: {
    ...mapActions({
      fetchManager: "fetchManager",
      fetchShop: "fetchShop",
      deleteShop: "deleteShop"
    }),

    navigateToAddArticle(id) {
      this.$router.push({
        name: "add-article-users",
        params: { id }
      });
    },

    onDeleteShop() {
      let confirm = window.confirm("Do you really want to delete this shop?");
      if (confirm) {
        this.deleteShop(this.shop.id).then(() =>
          this.$router.push({
            name: "shops"
          })
        );
      } else {
        return;
      }
    }
  },

  created() {
    this.fetchManager(JSON.parse(localStorage.getItem("user")).manager_id).then(
      () => {
        if (this.manager.shop !== null) {
          this.fetchShop(this.manager.shop.id);
        } else {
          this.$router.push({
            name: "add-shop"
          });
        }
      }
    );
  }
};
</script>

<style>
/* button {
  margin-bottom: 100px;
} */
</style>