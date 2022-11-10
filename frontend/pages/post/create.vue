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
      /* const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                } */
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
    },
  },
}
</script>
<!-- <template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel Vue JS File Upload Demo</div>
                    <div class="card-body">
                        <div v-if="success.value== true" class="alert alert-success">
                            {{success}}
                        </div>
                        <form @submit="formSubmit" enctype="multipart/form-data">
                            <input type="file" class="form-control" v-on:change="onChange">
                            <button class="btn btn-primary btn-block">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {ref} from 'vue'
    export default {
        setup() {
            const file = ref('')
            const success = ref('false')
            const onChange = (e)=> {
                file.value = e.target.files[0];
            }

            const formSubmit = (e) => {
                e.preventDefault();
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                let data = new FormData();
                data.append('file', file.value);
                console.log(data);
                this.axios.post('/api/post/create', data, config)
                    .then(function (res) {
                        success.value = res.data.success;
                    })
                    .catch(function (err) {
                        console.log(err)
                        output = err;
                    });
            }
            return {
                onChange,
                formSubmit,
                success 
            }
        }
    }
    </script> -->
