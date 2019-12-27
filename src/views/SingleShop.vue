<template>
  <div>
    <div class="jumbotron p-3 p-md-5 text-white rounded bg-dark">
  <div class="row">
    <div class="col">
      <button class="btn btn-info col-sm-3 btn-block" type="submit">Add Article</button>
    </div>
    <div class="w-100"></div>
    <div class="col">
            <img class="picture" :src="shop.logoUrl"/>
          <h1 class="display-4 font-italic">{{shop.name}}</h1>
          <p class="lead my-3" v-if="shop.manager">Manager: {{shop.manager.first_name + ' ' + shop.manager.last_name}}</p>
    </div>
    </div>
</div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {

    computed: {
        ...mapGetters({
            shop: 'shop'
        }),
    },

    methods: {
        ...mapActions({
            fetchShop: 'fetchShop'
        })
    },

    beforeRouteEnter(to,from,next) {
        next(vm => vm.fetchShop(vm.$route.params.id))
    }
}
</script>

<style>
</style>