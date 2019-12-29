<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <h3>Add article</h3>
        <label for="formGroupExampleInput">Name of article</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Name of article"
          v-model="form.name"
        />
        <div class="alert alert-danger" role="alert" v-if="articleErrors !== null">
          <strong>{{articleErrors.name[0]}}</strong>
        </div>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Price</label>
        <input
          type="number"
          class="form-control"
          id="formGroupExampleInput2"
          placeholder="Price($)"
          v-model="form.price"
        />
        <div class="alert alert-danger" role="alert" v-if="articleErrors !== null">
          <strong>{{articleErrors.price[0]}}</strong>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Descriptions</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="form.content"
        ></textarea>
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
          />
          <div class="alert alert-danger" role="alert" v-if="articleErrors !== null">
            <strong>{{articleErrors.imgUrl[0]}}</strong>
          </div>
        </div>
        <button
          class="btn btn-danger my-4 btn-block"
          type="button"
          @click="onDelete(index)"
        >Delete image</button>
        <button
          class="btn btn-info my-4 btn-block"
          type="button"
          @click="onAddAnotherImg"
        >Add another image</button>
        <button class="btn btn-primary my-4 btn-block" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: { name: "", price: "", content: "", imgUrl: "", shop_id: "" },
      images: [{ value: "" }],
      shops: []
    };
  },

  created() {
    this.fetchManager(JSON.parse(localStorage.getItem("user")).manager_id).then(
      () => {
        if (this.manager.shop !== null) {
          this.fetchShop(this.manager.shop.id);
        } else {
          alert(
            "You are not the manager of any shop. Please add a shop and select yourself as a manager."
          );
          this.$router.push({
            name: "add-shop"
          });
        }
      }
    );
  },

  computed: {
    ...mapGetters({
      manager: "manager",
      shop: "shop",
      articleErrors: "articleErrors"
    }),
    shopId() {
      return !this.$route.params.id ? this.shop.id : this.$route.params.id;
    }
  },

  methods: {
    ...mapActions({
      addArticle: "addArticle",
      fetchManager: "fetchManager",
      fetchShop: "fetchShop",
      fetchShops: "fetchShops"
    }),

    onSubmit() {
      this.images.forEach(img => {
        this.form.imgUrl += !this.form.imgUrl ? img.value : `,${img.value}`;
      });
      this.form.shop_id = this.shopId;
      this.addArticle(this.form).then(() => {
        if (this.articleErrors === null) {
          this.$router.push({
            name: "my-shop"
          });
        } else {
          return;
        }
      });
    },

    onAddAnotherImg() {
      this.images.push({ value: "" });
    },

    onDelete(index) {
      this.images.splice(index, 1);
    }
  }
};
</script>

<style>
</style>