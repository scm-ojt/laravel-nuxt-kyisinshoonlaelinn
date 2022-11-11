<template>
  <div class="container col-md-4 mt-5">
    <b-card mt-3 header="Login">
      <div
        v-if="errors != ''"
        class="bg-red py-1 px-4 pr-0 rounded font-bold mb-4 shadow-lg"
        style="color: red"
      >
        <div v-for="(v, k) in errors" :key="k">
          <p v-for="error in v" :key="error" class="text-sm pt-2">
            {{ error }}
          </p>
        </div>
      </div>
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
        </b-form-group>

        <b-form-group label="Password:" label-for="input-3">
          <b-form-input
            v-model="password"
            name="password"
            type="password"
            placeholder="Enter password"
          ></b-form-input>
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
      errors: [],
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
        .then((response) => console.log(response))
         /* .catch(function (error) {
          console.log("tdfd"+error.response.data);
          // this.errors = error.response.data.errors
        }) */
        .catch(error=>console.log(error));

        this.$router.push('/post/list')
    },
  },
}
</script>
