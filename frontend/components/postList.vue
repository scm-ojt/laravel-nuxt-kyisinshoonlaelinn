<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <NuxtLink :to="`/post/create`" class="btn btn-info">Add Post</NuxtLink>
        <div class="col-4" style="float: right">
          <form @submit.prevent="searchPost">
            <div class="input-group">
              <input
                type="search"
                v-model="search"
                name="search"
                placeholder="Search"
                class="form-control"
              />
              <div class="input-group-append">
                <button type="submit" class="btn btn-info">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        <!-- <div style="float:right;">
                <input type="search" name="search" v-model="search" />
                <button class="btn">Search</button>
                </div> -->
        <br /><br />
        <div class="card">
          <div class="card-header">Post List</div>

          <div class="card-body">
            <table>
              <tr>
                <th width="50%">Title</th>
                <th width="50%">Image</th>
                <th width="50%">Actions</th>
              </tr>
              <tr v-for="post in posts.data" :key="post.id">
                <td>{{ post.title }}</td>
                <td v-if="post.image">
                  <img
                    :src="`http://localhost:8000/storage/` + post.image"
                    alt=""
                    width="150px"
                    height="150px"
                  />
                </td>
                <td v-else>
                  <img
                    :src="`http://localhost:8000/storage/uploads/sample.jpg`"
                    alt=""
                    width="150px"
                    height="150px"
                  />
                </td>
                <td>
                  <NuxtLink :to="`/post/edit/${post.id}`" class="btn btn-info"
                    >Edit</NuxtLink
                  >
                  <button class="btn btn-danger" @click="deletePost(post.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Pagination
      :data="laravelData"
      @pagination-change-page="getResults"
  />
  </div>
</template>
<script>
import { Pagination } from 'laravel-vue-pagination';
export default {
    components: {
        Pagination
    },
  data() {
    return {
      search: '',
      posts: {},
    }
  },
  methods: {
    /* index() {
      this.$axios.get('/api/post/list').then((response) => {
        this.posts = response.data
      })
    }, */
    searchPost() {
      this.$axios
        .get('/api/post/list?search=' + this.search)
        .then((response) => {
          this.posts = response.data
        })
    },
    deletePost(id) {
      this.$axios.post(`/api/post/delete/${id}`).then((response) => {
        let i = this.posts.map((data) => data.id).indexOf(id)
        this.posts.splice(i, 1)
      })
    },
  },
  created() {
    this.searchPost()
  },
}
</script>
