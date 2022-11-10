<template>
<div class=" flex justify-between items-center my-10">
    <nuxt-link to="/" class=" text-2xl font-semibold">
      Laranuxt Aut
    </nuxt-link>
    <!-- logo -->
    <nav class=" flex space-x-10" v-if="!this.$auth.loggedIn">
      <nuxt-link
        class=" font-bold text-base uppercase"
        :to="{ name: 'auth-login' }"
        >Login</nuxt-link
      >
      <nuxt-link
        class=" font-bold text-base uppercase"
        :to="{ name: 'auth-register' }"
        >Register</nuxt-link
      >
    </nav>
    <nav class=" flex space-x-10" v-else>
      <div> Username - {{this.$auth.user.name}}</div>
      
      <div class="flex space-x-2 items-center">

      </div>
      <button @click="logout" class="font-bold text-base uppercase">
        Logout
      </button>
    </nav>
  </div>
</template>
<script>
  export default {
    middleware: 'auth',
    methods: {
    async logout() {
      this.$nuxt.$loading.start();
      this.$auth.logout();
      this.$nuxt.$loading.finish();
      this.$router.push({name: 'auth-login'});
    }
   /*  methods: {
      logout() {
        this.$axios.$post('/api/logout')
          .then(resp => {
            this.$store.dispatch('logout');
            this.$router.push('/');
          })
          .catch(errors => {
            console.dir(errors);
          });
      }*/
    } 
  }
</script>