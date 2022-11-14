<template>
  <div class="mb-5">
  <b-navbar toggleable="lg" type="dark" variant="secondary">
    <b-navbar-brand href="/">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="!this.$auth.loggedIn">
        <nuxt-link
        class=" font-bold text-base uppercase text-white px-4"
        :to="{ name: 'login' }"
        >Login</nuxt-link
      > 
      <nuxt-link
        class=" font-bold text-base uppercase text-white"
        :to="{ name: 'auth-register' }"
        >Register</nuxt-link
      >
      </b-navbar-nav>

      <b-navbar-nav v-else>
        <a href="#" @click="logout" class="font-bold text-base uppercase mx-4 text-white">
        Logout
        </a>
        <div class="text-white"> {{this.$auth.user.name}}</div>
        <nuxt-link
        class=" font-bold text-base uppercase text-white mx-4"
        :to="{ name: 'post-list' }"
        >Posts</nuxt-link
      >
      
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

</template>
<script>
  export default {
    
    methods: {
    async logout() {
      this.$nuxt.$loading.start();
      this.$auth.logout();
      this.$nuxt.$loading.finish();
      this.$router.push({ name: 'login' });
    }

    } 
  }
</script>