<template>
  <form class="text-center border border-light p-5" @submit.prevent="onSubmit()">
    <p class="h4 mb-4">Add Manager</p>

    <div class="form-row mb-4">
      <div class="col">
        <input
          type="text"
          id="defaultRegisterFormFirstName"
          class="form-control"
          placeholder="First name"
          v-model="form.first_name"
        />
        <div class="alert alert-danger" role="alert" v-if="errors.first_name">
          <strong>{{errors.first_name[0]}}</strong>
        </div>
      </div>
      <div class="col">
        <input
          type="text"
          id="defaultRegisterFormLastName"
          class="form-control"
          placeholder="Last name"
          v-model="form.last_name"
        />
        <div class="alert alert-danger" role="alert" v-if="errors.last_name">
          <strong>{{errors.last_name[0]}}</strong>
        </div>
      </div>
    </div>

    <input
      type="email"
      id="defaultRegisterFormEmail"
      class="form-control mb-4"
      placeholder="E-mail"
      v-model="form.email"
    />
    <div class="alert alert-danger" role="alert" v-if="errors.email">
      <strong>{{errors.email[0]}}</strong>
    </div>

    <input
      type="url"
      id="defaultRegisterFormPassword"
      class="form-control"
      placeholder="Image URL"
      aria-describedby="defaultRegisterFormPasswordHelpBlock"
      v-model="form.imageUrl"
    />
    <small
      id="defaultRegisterFormPasswordHelpBlock"
      class="form-text text-muted mb-4"
    >Youre image URL</small>
    <div class="alert alert-danger" role="alert" v-if="errors.imageUrl">
      <strong>{{errors.imageUrl[0]}}</strong>
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Select Shop</label>
      <select class="form-control" id="exampleFormControlSelect1" v-model="shop_id">
        <option value></option>
        <option v-for="shop in freeShops" :key="shop.id" :value="shop.id">{{shop.name}}</option>
      </select>
    </div>

    <button class="btn btn-info my-4 btn-block" type="submit">Submit</button>
    <button class="btn btn-dark my-4 btn-block" type="button" @click="navigateToManagers">Cancel</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: { first_name: "", last_name: "", email: "", imageUrl: "" },
      shop_id: ""
    };
  },

  computed: {
    ...mapGetters({
      errors: "managerErrors",
      shops: "shops"
    }),

    freeShops() {
      return this.shops.filter(shop => shop.manager_id === null);
    }
  },

  created() {
    this.fetchShops({ name: "" });
  },

  methods: {
    ...mapActions({
      addManager: "addManager",
      fetchShops: "fetchShops"
    }),

    onSubmit() {
      this.addManager({ manager: this.form, shop_id: this.shop_id }).then(
        () => {
          if (!this.errors)
            this.$router.push({
              path: "/managers",
              name: "managers"
            });
        }
      );
    },

    navigateToManagers() {
      this.$router.push({
        path: "/managers",
        name: "managers"
      });
    }
  }
};
</script>

<style>
</style>