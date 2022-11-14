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
                <button type="submit" class="btn btn-info">Search</button>
              </div>
            </div>
          </form>
        </div>
        <br /><br />
        <div class="card mb-4">
          <div class="card-header">Post List</div>

          <div class="card-body text-center">
            <table class="table col-md-10 mx-5">
              <tr>
                <th> ID </th>
                <th>Title</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
              <tr v-for="post in posts.data" :key="post.id">
                <td class="align-middle"> {{ post.id }}</td> 
                <td class="align-middle">{{ post.title }}</td>
                <td v-if="post.image">
                  <img
                    :src="`${$axios.defaults.baseURL}/storage/` + post.image"
                    alt=""
                    width="150px"
                    height="150px"
                  />
                </td>
                <td v-else>
                  <img
                    :src="`${$axios.defaults.baseURL}/storage/uploads/sample.jpg`"
                    alt=""
                    width="150px"
                    height="150px"
                  />
                </td>
                <td class="align-middle">
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
    <!-- <LaravelVuePagination :data="posts" @pagination-change-page="getResults"></LaravelVuePagination> -->
    <vs-pagination v-if="posts.data != ''"
      :total-pages="totalPages"
      @change="searchPost"
    ></vs-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalPages: 0,
      pageNo: 1,
      pageSize: 20,
      search: '',
      posts: [],
    }
  },
  computed: {
    rows() {
      return this.posts.length
    },
  },
  methods: {
    searchPost(page = 1) {
      this.$axios
        .get(`api/post/list?page=${page}&search=${this.search}`)
        .then((response) => {
          this.posts = response.data
          this.totalPages = response.data.last_page
        })
    },

    async deletePost(id) {
      if(confirm("Do you really want to delete?")) {
          this.$axios
            .post(`/api/post/delete/${id}`)
            .then( (response) => {
              console.log('success');
              this.searchPost(1)             
            })
            
        }
    },
    changePage(currentPage) {
      this.pageNo = currentPage
      this.searchPost()
    },
  },
  created() {
    this.searchPost()
  },
}
</script>
