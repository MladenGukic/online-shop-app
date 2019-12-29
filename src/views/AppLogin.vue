<template>
  <div class="card">
    <h5 class="card-header info-color white-text text-center py-4">
      <strong>Login</strong>
    </h5>

    <!--Card content-->
    <div class="card-body px-lg-5 pt-0">
      <!-- Form -->
      <form class="text-center" style="color: #757575;" @submit.prevent="submit">
        <div class="alert alert-danger" role="alert" v-if="loginErrors">
          <strong>{{loginErrors}}</strong>
        </div>
        <!-- Email -->
        <div class="md-form">
          <input type="email" id="materialLoginFormEmail" class="form-control" v-model="email" />
          <label for="materialLoginFormEmail">E-mail</label>
        </div>

        <!-- Password -->
        <div class="md-form">
          <input
            type="password"
            id="materialLoginFormPassword"
            class="form-control"
            v-model="password"
          />
          <label for="materialLoginFormPassword">Password</label>
        </div>

        <!-- Sign in button -->
        <button
          class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
          type="submit"
        >Login</button>
      </form>
      <!-- Form -->
    </div>
  </div>
  <!-- Material form login -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },

  computed: {
    ...mapGetters({
      loginErrors: "errors",
      errosStatus: "errosStatus"
    })
  },
  methods: {
    ...mapActions({
      login: "login"
    }),

    submit() {
      this.login({
        email: this.email,
        password: this.password
      }).then(() => {
        if (!this.errosStatus)
          this.$router.push({
            name: "shops"
          });
      });
    }
  }
};
</script>

<style>
</style>