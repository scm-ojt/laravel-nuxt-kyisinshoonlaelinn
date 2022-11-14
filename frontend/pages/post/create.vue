<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Create Post</div>
          <div class="card-body">
            <div v-if="success != ''" class="alert alert-success">
              {{ success }}
            </div>
            <form @submit="formSubmit" enctype="multipart/form-data">
              <label>Title</label>
              <input
                type="text"
                name="title"
                @change="textChange"
                class="form-control"
              />
              <small
            v-if="this.errors.title"
            class="text-danger font-weight-bolder"
            v-html="this.errors.title"
          />
               <br>
              <input
                type="file"
                name="image" accept="image/*"
                class="form-control mt-2"
                v-on:change="onChange"
              /> <br>
              <button class="btn btn-primary btn-block">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      file: '',
      success: '',
      errors: [],
    }
  },
  methods: {
    textChange(e) {
      this.title = e.target.value
    },
    onChange(e) {
      this.file = e.target.files[0]
    },
    formSubmit(e) {
      e.preventDefault()
      let existingObj = this
      let data = new FormData()
      data.append('file', this.file)
      data.append('title', this.title)
      this.$axios
        .post('/api/post/create', data)
        .then(function (res) {
          existingObj.success = res.data.success
          existingObj.errors = []
          this.$router.push({
            name: 'post-list'
          })
        })
        .catch(function (err) {
          console.log(err.response.data)
          existingObj.errors = err.response.data.errors
        })
        
    },
  },
}
</script>