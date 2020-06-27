<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h3>Create task</h3>
      <form>
        <div class="row">
          <div class="input-field">
            <input id="title" type="text" class="validate" required>
            <label for="title">Title</label>
            <span class="helper-text" data-error="Title is required"></span>
          </div>
          <div class="chips" ref="chips">
            <input class="custom-class">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Create',

  components: {
  },

  mounted() {
    M.Chips.init(this.$refs.chips, {
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
