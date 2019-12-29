<template>
  <div class="card">
    <img :src="manager.imageUrl" />
    <h1>{{manager.first_name + ' ' + manager.last_name}}</h1>
    <p class="title">Manager</p>
    <p class="title">Email: {{manager.email}}</p>
    <p v-if="manager.shop">
    <button @click="navigateToShop(manager.shop.id)">
      {{manager.shop.name}} <br>
      Articles: {{shop.articles.length}}
    </button>
  </p>
    <p v-else><button>Manager is aviable</button></p>
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
      fetchShop: "fetchShop"
    }),

    navigateToShop(id) {
      this.$router.push({
        name: "shop",
        params: { id }
      });
    }
  },

  created() {
    this.fetchManager(this.$route.params.id);
    if(this.manager.shop !== null)
    this.fetchShop(this.manager.shop.id);
  }
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: rgb(68, 218, 76);
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover,
a:hover {
  opacity: 0.7;
}
</style>