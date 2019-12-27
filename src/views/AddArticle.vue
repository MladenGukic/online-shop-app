<template>
  <div>
    <form @submit.prevent="onSubmit">
  <div class="form-group">
    <h3> Add article </h3>
    <label for="formGroupExampleInput">Name of article</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Name of article" v-model="form.name" required>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Price</label>
    <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="Price($)" v-model="form.price" required>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Descriptions</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="form.content"></textarea>
  </div>
  <div class="form-group">
    <label for="inputArticleUrl" class="sr-only">Image URL</label>
        <div v-for="(image, index) in images" :key="index">
        <input
          type="url"
          class="form-control"
          placeholder="Image URl"
          title="Image must be jpg,jpeg or png"
          v-model="image.value"
          required
        />
        </div>
        <button class="btn btn-danger my-4 btn-block" type="button" @click="onDelete(index)">Delete image</button>
        <button class="btn btn-info my-4 btn-block" type="button" @click="onAddAnotherImg">Add another image</button>
        <button class="btn btn-primary my-4 btn-block" type="submit">Submit</button>
  </div>
</form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
      form: { name: "", price: "", content: "", imgUrl: "", shop_id: "" },
      images: [{ value: "" }]
    }
  },

  created() {
    this.fetchManager(this.user.manager_id)
    .then(() => {
      this.fetchShop(this.manager.shop.id)
      })
  },

  computed: {
    ...mapGetters({
      user: 'user',
      manager: 'manager',
      shop: 'shop'
    }),
    shopId () {
      return !this.$route.params.id ? this.shop.id : this.$route.params.id
    }
  },

  methods: {
    ...mapActions({
      addArticle : 'addArticle',
      fetchManager: 'fetchManager',
      fetchShop: 'fetchShop'
    }),

    onSubmit() {
            this.images.forEach(img => {
        this.form.imgUrl += !this.form.imgUrl ? img.value : `,${img.value}`;
      });
      this.form.shop_id = this.shopId
      this.addArticle(this.form)
      .then(() => {
        this.$router.push({
          name: 'my-shop'
        })
      })
    },

    onAddAnotherImg() {
      this.images.push({ value: "" });
    },

    onDelete(index) {
      this.images.splice(index, 1);
    }
  }
}
</script>

<style>

</style>