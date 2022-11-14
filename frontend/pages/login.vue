<template>
  <div class="container col-md-4 mt-5">
    <b-card mt-3 header="Login">
      <b-form @submit.prevent="login">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="email"
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

        <b-form-group label="Password:" label-for="input-3">
          <b-form-input
            v-model="password"
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

        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      console.log(this.$auth)
      await this.$auth
        .loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          console.log(response)
          this.$router.push('post/list')
        })
        .catch((error) => {
          error.response.data.errors.email
            ? (this.error.email = error.response.data.errors.email[0])
            : (this.error.email = '')
          error.response.data.errors.password
            ? (this.error.password = error.response.data.errors.password[0])
            : (this.error.password = '')
        })
    },
  },
}
</script>
