<template>
  <div class="row grey lighten-4">
    <div class="col s6 offset-s3">
      <h3>Create task</h3>
      <form @submit.prevent="onSubmit">
        <div class="row">
          <div class="input-field">
            <input id="title" type="text" class="validate" required v-model="title">
            <label for="title">Title</label>
            <span class="helper-text" data-error="Title is required"></span>
          </div>

          <div class="input-field">
            <textarea id="description" class="materialize-textarea" v-model="description"></textarea>
            <label for="description">Textarea</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
          </div>

          <input type="text" ref="datepicker">

          <div class="chips" ref="chips">
            <input class="custom-class">
          </div>

          <button class="btn right" type="submit">Submit</button>
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

  data: () => ({
    title: '',
    description: '',
    date: null,
    tags: null,
  }),

  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
    });

    this.datepicker = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    });
  },

  destroyed() {
    if (this.datepicker && this.datepicker.destroy) {
      this.datepicker.destroy();
    }

    if (this.chips && this.chips.destroy) {
      this.chips.destroy();
    }
  },

  methods: {
    onSubmit() {
      const task = {
        id: new Date().getTime().toString(12),
        title: this.title,
        description: this.description,
        date: this.datepicker.date,
        tags: this.chips.chipsData
      };

      this.$store.commit('addTask', task);

      this.$router.push('/list');

      console.log('onSubmit', task);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
