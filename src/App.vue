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

body {
  //background: color("materialize-red", "lighten-2");
}
main {
  //padding: 0 1rem;
}
</style>
