<template>
  <div id="app">
    <nav-bar />
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
  import navBar from '@/components/navbar.vue';

  export default {
    name: 'App',

    components: {
      navBar
    }
  }
</script>

<style lang="scss">
//@import "~materialize-css/dist/css/materialize.min.css";

main {
  padding: 0 1rem;
}
</style>
