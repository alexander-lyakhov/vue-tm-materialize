<template>
  <nav class="light-blue darken-3">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Task manager</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link tag="li" to="/" active-class="active" exact>
          <a href="#">Create task</a>
        </router-link>
        <router-link tag="li" to="/list" active-class="active">
          <a href="#">Task List</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>

<style lang="scss" scoped>
  nav {
    padding: 0 1rem;
  }
</style>