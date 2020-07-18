<template>
  <div class="row grey lighten-4">
    <div class="col s6 offset-s3">
      <div class="row">
        <h3>Create new task</h3>
      </div>
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

          <button class="btn teal lighten-1 right" type="submit">
            Submit
            <i class="material-icons right">send</i>
          </button>

          <router-link
            class="btn-floating btn-large btn-cancel blue lighten-1"
            to="/list"
            ref="btn-cancel"
            data-tooltip="Cancel"
          >
            <i class="material-icons right">directions_run</i>
          </router-link>
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
    const elems = document.querySelectorAll('.btn-floating');

    M.Tooltip.init(elems, {
      position: 'right',
      exitDelay: 0
    });

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
        tags: this.chips.chipsData,
        isComplete: false
      };

      this.$store.commit('addTask', task);

      this.$router.push('/list');

      console.log('onSubmit', task);
    }
  },
}
</script>

<style lang="scss" scoped>
  .btn {
    min-width: 120px;
  }

  form {
    position: relative;
  }

  .btn-floating {
    position: absolute;
    right: -120px;
  }

  .btn-cancel {
    top: 0;
  }
</style>
