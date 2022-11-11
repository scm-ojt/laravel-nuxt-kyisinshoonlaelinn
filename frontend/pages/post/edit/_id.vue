<template>
    <div class="container">
        <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Edit Post</div>
          <div class="card-body">
                <form @submit.prevent="updatePost" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Title</label>
                        <input name="title" type="text" class="form-control" v-model="post.title" @change="textChange" required> <br>
                        <label>Image</label>
                        <img :src="`http://localhost:8000/storage/` + post.image" class="m-4 mt-3 border border-secondary" 
                      alt=""
                      width="150px"
                      height="150px"
                    />
                        <input type="file" name="file" class="form-control" v-on:change="onChange">
                    </div>
                    <button type="submit" class="btn btn-primary">Update</button>
                    <NuxtLink :to="`/post/list`" class="btn btn-secondary">Back</NuxtLink>
                </form>
            </div></div></div>
        </div>
    </div>
</template>
 
<script>
    export default {
        data() {
            return {
                post: {
                    title: '',
                    file: '',
                }
            }
        },
        created() {
            this.$axios
                .get(`/api/post/edit/${this.$route.params.id}`)
                .then((res) => {
                    this.post = res.data;
                });
        },
        methods: {
            textChange(e) {
                this.post.title = e.target.value;
            },
            onChange(e) {
                this.post.file = e.target.files[0];
            },
            updatePost(e) {
                e.preventDefault();
                let data = new FormData();
                data.append('file', this.post.file);
                data.append('title', this.post.title);
                this.$axios
                    .post(`/api/post/update/${this.$route.params.id}`, data)
                    .then((res) => {
                        this.$router.push({ name: 'post-list' });
                    });
            },
            
        }
    }
</script>