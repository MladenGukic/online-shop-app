<template>
  <div>
    <div class="jumbotron p-3 p-md-5 text-white rounded bg-dark">
  <div class="row">
    <div class="col">
      <button class="btn btn-info col-sm-3 btn-block" type="button" @click="navigateToAddArticle(shop.id)">Add Article</button>
    </div>
    <div class="w-100"></div>
    <div class="col">
            <img class="picture" v-if="manager.shop" :src="manager.shop.logoUrl"/>
          <h1 class="display-4 font-italic" v-if="manager.shop">{{manager.shop.name}}</h1>
          <p class="lead my-3 " v-if="manager.shop">Manager: {{manager.first_name + ' ' + manager.last_name}}</p>
          <ul class="list-group">
            Articles:
          <li class="list-group-item list-group-item-dark" v-for="article in shop.articles" :key="article.id">
                  <img class="picture"  :src="article.imgUrl.split(',')[0]"/> {{article.name}} | {{article.content}} | {{article.price}}$ 
          </li>
      </ul>
    </div>
    </div>
</div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
      ...mapGetters({
         user: 'user' ,
         manager: 'manager',
         shop: 'shop'
      })
  },

  methods: {
    ...mapActions({
      fetchManager: 'fetchManager',
      fetchShop: 'fetchShop'
    }),

    navigateToAddArticle(id) {
      this.$router.push({
        name: 'add-article-users',
        params: {id}
      })
    }
  },

  created() {
    this.fetchManager(this.user.manager_id)
    .then(() => {
      this.fetchShop(this.manager.shop.id)
      })
  },

}
</script>

<style>
/* button {
  margin-bottom: 100px;
} */

</style>