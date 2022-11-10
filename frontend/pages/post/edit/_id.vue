<template>
    <div class="container">
        <h3 class="text-center">Edit Post</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updatePost" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Title</label>
                        <input name="title" type="text" class="form-control" v-model="post.title" @change="textChange" required>
                        <input type="file" name="file" class="form-control" v-on:change="onChange">
                    </div>
                    <!-- <div class="form-group">
                        <label>Detail</label>
                        <input type="text" class="form-control" v-model="post.image">
                    </div> -->
                    <button type="submit" class="btn btn-primary">Update</button>
                </form>
            </div>
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
                        this.$router.push({ name: 'index' });
                    });
            },
            
        }
    }
</script>