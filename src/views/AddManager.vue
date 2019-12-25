<template>
  <form class="text-center border border-light p-5" @submit.prevent="onSubmit">

    <p class="h4 mb-4">Add Manager</p>

    <div class="form-row mb-4">
        <div class="col">
            <!-- First name -->
            <input type="text" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name" v-model="form.first_name">
        </div>
        <div class="col">
            <!-- Last name -->
            <input type="text" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name" v-model="form.last_name" required>
        </div>
    </div>

    <!-- E-mail -->
    <input type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail" v-model="form.email" required>

    <input type="url" id="defaultRegisterFormPassword" class="form-control" placeholder="Image URL" aria-describedby="defaultRegisterFormPasswordHelpBlock" v-model="form.imageUrl">
    <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
        Youre image URL
    </small>

    <!-- Sign up button -->
    <button class="btn btn-info my-4 btn-block" type="submit">Submit</button>

</form>
                       
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data() {
        return {
            form: {first_name: '', last_name: '', email: '', imageUrl: ''}
        }
    },

    computed: {
        ...mapGetters({
            errors: 'managerErrors'
        })
    },

    methods: {
        ...mapActions({
            addManager: 'addManager'
        }),

        onSubmit() {
            this.addManager(this.form)
            .then(() => {this.$router.push({
                name: 'managers'
            })})
        }
    }
}
</script>

<style>

</style>