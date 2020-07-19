<template>
  <div class="row grey lighten-4">
    <div class="col s6 offset-s3">
      <div class="row">
        <h3><span class="grey-text">Task:</span> {{task.title}}</h3>
      </div>

      <div class="row">
        <div class="left">Status: <span class="status-value" :class="{'completed': task.isComplete}">{{status}}</span></div>
        <div class="switch right">
          <label>
            Active
            <input type="checkbox" v-model="task.isComplete">
            <span class="lever"></span>
            Completed
          </label>
        </div>
      </div>

      <form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <div class="row">
          <div class="input-field">
            <input id="title" type="text" ref="title" class="validate" required v-model="task.title" :disabled="task.isComplete">
            <label for="title" ref="label-title">Title</label>
            <span class="helper-text" data-error="Title is required"></span>
          </div>

          <div class="input-field">
            <textarea id="description" ref="description" class="materialize-textarea" v-model="task.description" :disabled="task.isComplete"></textarea>
            <label for="description" ref="label-description">Textarea</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{(task.description || '').length}}/2048</span>
          </div>

          <input type="text" ref="datepicker" :disabled="task.isComplete">

          <div v-show="!task.isComplete" class="chips" ref="chips">
            <input>
          </div>
          <div v-show="task.isComplete" class="chips input-field">
            <div class="chip" v-for="(chip, index) in task.tags" :key="index">
              {{chip.tag}}
              <i class="material-icons check">check</i>
            </div>
          </div>

          <button v-if="!task.isComplete" class="btn teal lighten-1 right" type="submit">
            Update
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

          <button
            class="btn-floating btn-large btn-reset orange darken-2 waves-effect waves-light"
            type="reset"
            ref="btn-reset"
            data-tooltip="Reset"
          >
            <i class="material-icons right">autorenew</i>
          </button>
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
    const elems = document.querySelectorAll('.btn-floating');

    M.Tooltip.init(elems, {
      position: 'right',
      exitDelay: 0
    });

    this.init();
  },

  beforeDestroy() {
    console.log('beforeDestroy');
    this.destroy();
  },

  computed: {
    ...mapGetters(['taskById']),

    status() {
      return !this.task.isComplete? 'Active':'Completed';
    }
  },

  methods: {
    onSubmit() {
      console.log('onSubmit');

      this.$store.commit('updateTask', this.task);

      this.$router.push('/list');
    },

    onReset() {
      console.log('onReset');
      this.destroy();
      this.init();
    },

    onDateSelect(date) {
      console.log('onDateSelect', date);
      this.task.date = date;
    },

    init() {
      console.log('init');

      const _this = this;

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
        setDefaultDate: true,
        onSelect: _this.onDateSelect
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
  .status-value {
    color: #000;
    background: #00e676;
    border-radius: 4px;
    margin: 0 0 0 .25rem;
    padding: .5rem .75rem;

    &.completed {
      background: #c0c0c0;
    }
  }

  .btn {
    min-width: 120px;
  }

  form {
    position: relative;

    i.check {
      font-size: 13px;
      padding-left: 8px;
    }
  }

  .btn-floating {
    position: absolute;
    right: -120px;
  }

  .btn-cancel {
    top: 0;
  }

  .btn-reset {
    top: 72px;
  }
</style>
