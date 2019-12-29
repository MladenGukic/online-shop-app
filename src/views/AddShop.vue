<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <div>
          <h3>Add Shop</h3>
        </div>
        <label for="exampleFormControlInput1">Name</label>
        <input type="text" class="form-control" placeholder="Shop Name" v-model="form.name" />
        <div class="alert alert-danger" role="alert" v-if="shopErrors.name">
          <strong>{{shopErrors.name[0]}}</strong>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlInput1">Logo</label>
        <input type="text" class="form-control" placeholder="Logo URL" v-model="form.logoUrl" />
        <div class="alert alert-danger" role="alert" v-if="shopErrors.logoUrl">
          <strong>{{shopErrors.logoUrl[0]}}</strong>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Select Manager</label>
        <select class="form-control" id="exampleFormControlSelect1" v-model="form.manager_id">
          <option
            v-for="manager in freeManagers"
            :key="manager.id"
            :value="manager.id"
          >{{manager.first_name}}</option>
        </select>
      </div>
      <button class="btn btn-info my-4 btn-block" type="submit">Submit</button>
      <button class="btn btn-dark my-4 btn-block" type="button" @click="navigateToShops">Cancel</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: { name: "", logoUrl: "", manager_id: "" }
    };
  },
  computed: {
    ...mapGetters({
      shopErrors: "shopErrors",
      managers: "managers"
    }),

    freeManagers() {
      return this.managers.filter(manager => manager.shop === null);
    }
  },

  methods: {
    ...mapActions({
      fetchManagers: "fetchManagers",
      addShop: "addShop"
    }),

    onSubmit() {
      this.addShop(this.form).then(() => {
        if (!this.shopErrors.name) {
          this.$router.push({
            name: "shops"
          });
        } else {
          return;
        }
      });
    },

    navigateToShops() {
      this.$router.push({
        name: "shops"
      });
    }
  },

  created() {
    this.fetchManagers();
  }
};
</script>

<style>
</style>