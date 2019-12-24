<template>
  <form class="text-center border border-light p-5" @submit.prevent="onSubmit">

    <p class="h4 mb-4">Sign up</p>

    <div class="form-row mb-4">
        <div class="col">
            <!-- First name -->
            <input type="text" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name" v-model="form.first_name" required>
        </div>
        <div class="col">
            <!-- Last name -->
            <input type="text" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name" v-model="form.last_name" required>
        </div>
    </div>

    <!-- E-mail -->
    <input type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail" v-model="form.email" required>
    <div class="alert alert-danger" role="alert" v-if="registerError.email">
        <strong> {{registerError.email[0]}} </strong>
      </div>
    <!-- Password -->
    <input type="password" id="defaultRegisterFormPassword" name="password" class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock" pattern="(?=.*\d)(?=.*[a-z]).{8,}" v-model="form.password" required>
    <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
        At least 8 characters and 1 digit
    </small>

    <input type="password" id="defaultRegisterConfirmPassword" name="password_confirmation" class="form-control" placeholder="Confirm" aria-describedby="defaultRegisterFormPasswordHelpBlock" v-model="form.password_confirm" required>
    <small id="defaultRegisterConfirmPasswordHelpBlock" class="form-text text-muted mb-4">
        Confirm password
    </small>
    <div class="alert alert-danger" role="alert" v-if="registerError.password_confirm">
        <strong> {{registerError.password_confirm[0]}} </strong>
      </div>

    <!-- Newsletter -->
    <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="defaultRegisterFormNewsletter" required>
        <label class="custom-control-label" for="defaultRegisterFormNewsletter">I accept terms and conditions</label>
    </div>

    <!-- Sign up button -->
    <button class="btn btn-info my-4 btn-block" type="submit">Sign in</button>
    <!-- Social register -->
</form>
<!-- Default form register -->
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
            form: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirm: ''
            }
        }
    },

    computed: {
        ...mapGetters({
            registerError: 'errors'
        })
    },
    methods:
    {
        ...mapActions({
            register: 'register'
        }),

        onSubmit() {
            this.register(this.form)
            .then(() => {
                if(this.registerError === null)
                this.$router.push({
                    name: 'login'
                })
            })
        }
    }
}
</script>

<style>

</style>