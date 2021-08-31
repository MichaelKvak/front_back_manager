import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tasksList: [],

    loading: false, //Індикатор загрузки
    error: null, //Індикатор помилки
  },
  getters: {
    getTasksList: (state) => state.tasksList,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
  mutations: {
    setTaskList(state, list) {
      state.tasksList = list
    },
    deleteTask(state, taskId) {
      state.tasksList = state.tasksList.filter((item) => item._id !== taskId)
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    },
  },
  actions: {
    loadTasks({ commit }) {
      commit('setLoading', true) //Встановлюємо індикатор загрузки (розпочинається завантаження даних)
      commit('setError', null) //Поки помилки ще немає
      axios
        .get('http://localhost:3000/tasks')
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit('setTaskList', resData.data)
          else throw new Error('Fetch faild!')
        })
        .catch((err) => {
          commit('setError', err)
        })
        .finally(() => commit('setLoading', false))
    },
    createTask({ commit }, { taskTitle, taskPriority }) {
      commit('setLoading', true) //Встановлюємо індикатор загрузки (розпочинається завантаження даних)
      commit('setError', null) //Поки помилки ще немає
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/tasks/add', {
            taskTitle,
            taskPriority,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true)
            else throw new Error('Fetch faild!')
          })
          .catch((err) => {
            commit('setError', err)
            reject(err)
          })
          .finally(() => commit('setLoading', false))
      })
    },
    deleteTasks({ commit }, taskId) {
      commit('setLoading', true) //Встановлюємо індикатор загрузки (розпочинається завантаження даних)
      commit('setError', null) //Поки помилки ще немає
      axios
        .delete('http://localhost:3000/tasks', {
          data: {
            taskId,
          },
        })
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit('deleteTask', taskId)
          else throw new Error('Fetch faild!')
        })
        .catch((err) => {
          commit('setError', err)
        })
        .finally(() => commit('setLoading', false))
    },
  },
})

export default store
