<template>
  <div class="row grey lighten-4">
    <div class="col s6 offset-s3">
      <h3>Task details</h3>
      <form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <div class="row">
          <div class="input-field">
            <input id="title" type="text" ref="title" class="validate" required v-model="task.title">
            <label for="title" ref="label-title">Title</label>
            <span class="helper-text" data-error="Title is required"></span>
          </div>

          <div class="input-field">
            <textarea id="description" ref="description" class="materialize-textarea" v-model="task.description"></textarea>
            <label for="description" ref="label-description">Textarea</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{(task.description || {}).length}}/2048</span>
          </div>

          <input type="text" ref="datepicker">

          <div class="chips" ref="chips">
            <input class="custom-class">
          </div>

          <button class="btn teal lighten-1" type="submit">
            Update
            <i class="material-icons right">send</i>
          </button>

          <button class="btn red lighten-2" type="reset">
            Reset
            <i class="material-icons right">autorenew</i>
          </button>

          <router-link class="btn blue lighten-1 right" to="/list">
            Cancel
            <i class="material-icons right">directions_run</i>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
  name: 'task-details',

  data: () => ({
    task: {}
  }),

  mounted() {
    this.init();
  },

  beforeDestroy() {
    console.log('beforeDestroy');
    this.destroy();
  },

  computed: {
    ...mapGetters(['taskById']),

    isTitleActive() {
      return this.task.title && this.task.title.value !== '';
    },

    isDescriptionActive() {
      return this.task.description && this.task.description.value !== '';
    }
  },

  methods: {
    onSubmit() {
      console.log('onSubmit');
    },

    onReset() {
      console.log('onReset');
      this.destroy();
      this.init();
    },

    init() {
      console.log('init');

      const id = this.$route.params.id;
      this.task = JSON.parse(JSON.stringify(this.taskById(id)));

      this.chips = M.Chips.init(this.$refs.chips, {
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
        data: this.task.tags
      });

      this.datepicker = M.Datepicker.init(this.$refs.datepicker, {
        format: 'dd.mm.yyyy',
        defaultDate: new Date(this.task.date),
        setDefaultDate: true
      });

      this.$refs.description.value = this.task.description;
      M.textareaAutoResize(this.$refs.description);

      setTimeout(() => {
        this.$refs['label-title'].classList.add('active');
        this.$refs['label-description'].classList.add('active');
      }, 0)
    },

    destroy() {
      console.log('destroy');

      if (this.datepicker && this.datepicker.destroy) {
        this.datepicker.destroy();
      }

      if (this.chips && this.chips.destroy) {
        this.chips.destroy();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    min-width: 120px;
    margin: 0 8px 0 0;
  }
</style>
