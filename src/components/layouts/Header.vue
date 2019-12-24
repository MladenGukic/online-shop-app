<template>
  <header>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <router-link class="navbar-brand" to="/">Shops</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/register">Register <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
        <router-link class="nav-link" to="/managers" v-if="isUserAuthenticated">All Managers</router-link>
        </li>
        <li class="nav-item">
        <router-link class="nav-link" to="/my-shop" v-if="isUserAuthenticated">My Shop</router-link>
        </li>
        <li class="nav-item">
        <router-link class="nav-link" to="/shop/create" v-if="isUserAuthenticated">Add Shop</router-link>
        </li>
        <li class="nav-item">
        <router-link class="nav-link" to="/article/create" v-if="isUserAuthenticated">Add Article</router-link>
        </li>
        <li class="nav-item" v-if="isUserAuthenticated">
         <button class="btn btn-outline-danger my-2 my-sm-0" @click="onLogout">Logout</button>
        </li> 
        <li class="nav-item" v-else>
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</header>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'Header',

    computed: {
      ...mapGetters({
        isUserAuthenticated : 'isUserAuthenticated'
      }),
    },

    methods: {
      ...mapActions({
        logout: 'logout'
      }),

      onLogout() {
        this.logout()
        .then(() => {this.$router.push({
          name: 'login'
        })})
      }
    }
}
</script>

<style>

</style>