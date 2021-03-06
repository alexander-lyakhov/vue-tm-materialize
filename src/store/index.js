import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks')) || []
  },

  getters: {
    taskById(state) {
      return (id) => state.tasks.find(el => el.id === id);
    }
  },

  mutations: {
    addTask(state, task) {
      console.log('addTask');
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    updateTask(state, task) {
      const index = state.tasks.findIndex(el => el.id === task.id);
      console.log('updateTask', task, index);

      if (index >= 0) {
        state.tasks[index] = task;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    }
  },

  actions: {
  },

  modules: {
  }
})
