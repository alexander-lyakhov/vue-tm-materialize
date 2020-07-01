<template>
  <div class="row">
  <div class="col s10 offset-s1">
    <h3>Task list</h3>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{index + 1}}</td>
          <td>{{task.title}}</td>
          <td class="cell-description truncate">{{task.description}}</td>
          <td>{{dateToString(task)}}</td>
          <td>{{getStatus(task)}}</td>
          <td><router-link  class="btn" :to="`/task/${task.id}`">Open</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>

import {mapState} from 'vuex';

export default {
  name: 'task-list',

  computed: {
    ...mapState(['tasks']),
  },

  methods: {
    dateToString(task) {
      return new Date(task.date).toLocaleDateString()
    },
    isActive(task) {
      return (Date.now() < new Date(task.date).getTime());
    },

    getStatus(task) {
      return (Date.now() < new Date(task.date).getTime()) ? 'active':'out of date';
    }
  }
}
</script>

<style lang="scss" scoped>
  .cell-description {
    //background: #edc;
    max-width: 400px;
  }
</style>
