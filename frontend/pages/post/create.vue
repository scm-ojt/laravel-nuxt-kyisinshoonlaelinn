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
            <div
              v-if="errors != ''"
              class="bg-red py-1 px-4 pr-0 rounded font-bold mb-4 shadow-lg" style = "color: red;"
            >
              <div v-for="(v, k) in errors" :key="k">
                <p v-for="error in v" :key="error" class="text-sm pt-2">
                  {{ error }}
                </p>
              </div>
            </div>
            <form @submit="formSubmit" enctype="multipart/form-data">
              <label>Title</label>
              <input
                type="text"
                name="title"
                @change="textChange"
                class="form-control"
              /> <br>
              <input
                type="file"
                name="image"
                class="form-control"
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
        })
        .catch(function (err) {
          existingObj.errors = err.response.data.errors
        })
        this.$router.push({ name: 'post-list' });
    },
  },
}
</script>