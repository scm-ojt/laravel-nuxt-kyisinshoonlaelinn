<template>
  <div class="container col-md-4 mt-5">
    <b-card mt-3 header="Register">
      <b-form @submit.prevent="register" @reset.prevent="onReset">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            name="email"
            placeholder="Enter email"
          ></b-form-input>
          <small
            v-if="this.error.email"
            class="text-danger font-weight-bolder"
            v-html="this.error.email"
          />
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            type="text"
            name="name"
            placeholder="Enter name"
          ></b-form-input>
          <small
            v-if="this.error.name"
            class="text-danger font-weight-bolder"
            v-html="this.error.name"
          />
        </b-form-group>

        <b-form-group label="Password:" label-for="input-3">
          <b-form-input
            v-model="form.password"
            name="password"
            type="password"
            placeholder="Enter password"
          ></b-form-input>
          <small
            v-if="this.error.password"
            class="text-danger font-weight-bolder"
            v-html="this.error.password"
          />
        </b-form-group>

        <b-form-group label="Confirm Password:">
          <b-form-input
            v-model="form.password_confirmation"
            type="password"
            name="password_confirmation"
            placeholder="Enter email"
          ></b-form-input>
          <small
            v-if="this.error.password_confirmation"
            class="text-danger font-weight-bolder"
            v-html="this.error.password_confirmation"
          />
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      show: true,
      error: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  mounted() {
    this.$axios.$get('/sanctum/csrf-cookie')
  },
  methods: {
    register() {
    
        this.$axios.post('/api/register', this.form)
        .then((res) => {
          this.$auth.loginWith('laravelSanctum', { data: this.form })
          this.$router.push({
            path: '/post/list',
          })
        })
      .catch ((error) => {
        console.log(error);
        error.response.data.errors.email
          ? (this.error.email = error.response.data.errors.email[0])
          : (this.error.email = '')
        error.response.data.errors.name
          ? (this.error.name = error.response.data.errors.name[0])
          : (this.error.name = '')
        error.response.data.errors.password
          ? (this.error.password = error.response.data.errors.password[0])
          : (this.error.password = '')
        error.response.data.errors.password_confirmation
          ? (this.error.password_confirmation =
              error.response.data.errors.password_confirmation[0])
          : (this.error.password_confirmation = '')
      })
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
