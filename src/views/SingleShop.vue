<template>
  <div>
    <div class="jumbotron p-3 p-md-5 text-white rounded bg-dark">
      <div class="row">
        <div class="col">
          <button
            class="btn btn-info col-sm-3 btn-block"
            type="button"
            v-if="isUsersShop"
            @click="navigateToAddArticle(shop.id)"
          >Add Article</button>
          <button
            class="btn btn-danger col-sm-3 btn-block"
            type="button"
            v-if="isUsersShop"
            @click="onDeleteShop"
          >Delete shop</button>
        </div>
        <div class="w-100"></div>
        <div class="col">
          <img class="picture" :src="shop.logoUrl" />
          <h1 class="display-4 font-italic">{{shop.name}}</h1>
          <p
            class="lead my-3"
            v-if="shop.manager_id !== null"
          >Manager: {{manager.first_name + ' ' + manager.last_name}}</p>
          <p class="lead my-3" v-if="shop.manager_id === null">No manager</p>
          <ul class="list-group text-left list-inline">
            <h4>Articles</h4>
            <li
              class="list-group-item list-group-item-dark"
              v-for="(article,index) in shop.articles"
              :key="index"
            >
              <img class="img-thumbnail" height="70" width="70" :src="article.imgUrl.split(',')[0]" />
              {{article.name}} | {{article.content}} | {{article.price}}$
            </li>
          </ul>

          <div>
            <h4 v-if="shopComments.length > 0">Comments</h4>
            <h4 v-else>No comments</h4>
            <ul class="list-group">
              <li
                class="list-group-item list-group-item-info"
                v-for="comment in shopComments"
                :key="comment.id"
              >
                <div class="row">
                  <button
                    class="btn btn btn-danger col-sm-2 btn-block btn-xs"
                    v-if="isUsersComment(comment.user_id)"
                    @click="onDeleteComment(comment.id)"
                  >Delete</button>
                  <span class="col col-sm-2">{{comment.user.first_name}}</span>
                </div>
                <br />
                <p>{{comment.text}}</p>
              </li>
            </ul>
            <form class="form-group" v-if="isUserAuthenticated">
              <textarea
                v-model="form.text"
                class="form-control rounded-0"
                rows="3"
                placeholder="Your comment..."
              ></textarea>
              <div class="alert alert-danger" role="alert" v-if="commentErrors.text">
                <strong>{{commentErrors.text[0]}}</strong>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="addComment(form)"
              >Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        text: "",
        user_id: JSON.parse(localStorage.getItem("user")).id,
        shop_id: this.$route.params.id
      }
    };
  },

  computed: {
    ...mapGetters({
      shop: "shop",
      manager: "manager",
      managers: "managers",
      comments: "comments",
      commentErrors: "commentErrors",
      isUserAuthenticated: "isUserAuthenticated"
    }),

    isUsersShop() {
      if (this.isUserAuthenticated && this.shop.manager_id !== null) {
        if (
          this.manager.id ===
          JSON.parse(localStorage.getItem("user")).manager_id
        ) {
          return true;
        }
        return false;
      }
      return false;
    },

    shopComments() {
      let filteredComments = this.comments.filter(
        comment => comment.shop_id === this.shop.id
      );
      return filteredComments;
    }
  },

  methods: {
    ...mapActions({
      fetchShop: "fetchShop",
      fetchManager: "fetchManager",
      fetchComments: "fetchComments",
      addComment: "addComment",
      deleteComment: "deleteComment",
      deleteShop: "deleteShop"
    }),

    isUsersComment(id) {
      if (this.isUserAuthenticated) {
        if (JSON.parse(localStorage.getItem("user")).id === id) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    onDeleteShop() {
      let confirm = window.confirm("Do you really want to delete this shop?");
      if (confirm) {
        this.deleteShop(this.shop.id).then(() =>
          this.$router.push({
            name: "shops"
          })
        );
      } else {
        return;
      }
    },

    navigateToAddArticle(id) {
      this.$router.push({
        name: "add-article-users",
        params: { id }
      });
    },

    onDeleteComment(id) {
      let confirm = window.confirm(
        "Do you really want to delete this comment?"
      );
      if (confirm) {
        this.deleteComment(id);
      } else {
        return;
      }
    },
    onAddComment(form) {
      this.addComment(form).then(() => {
        this.defaultForm();
      });
    },

    defaultForm() {
      return (this.form = {
        text: "",
        user_id: JSON.parse(localStorage.getItem("user")).id,
        shop_id: this.$route.params.id
      });
    }
  },

  created() {
    this.fetchShop(this.$route.params.id).then(
      () => this.fetchManager(this.shop.manager_id),
      this.fetchComments()
    );
  }
};
</script>

<style>
</style>