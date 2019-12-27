<template>
  <div>
    <div class="jumbotron p-3 p-md-5 text-white rounded bg-dark">
  <div class="row">
    <div class="col">
      <button class="btn btn-info col-sm-3 btn-block" type="submit">Add Article</button>
    </div>
    <div class="w-100"></div>
    <div class="col">
            <img class="picture" v-if="manager.shop" :src="manager.shop.logoUrl"/>
          <h1 class="display-4 font-italic" v-if="manager.shop">{{manager.shop.name}}</h1>

          <p class="lead my-3 " v-if="manager.shop">Manager: {{manager.first_name + ' ' + manager.last_name}}</p>
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