import { createStore } from 'vuex'

export default createStore({
  state: {
    creating: false,
    editing: false,
    search: '',
    searchType: '',
    filterIsOpen: false,
    filterPlayed: 'All',
    dropDownIsOpen: false,
    games: [],
    gameToEdit: {
      id: null,
      title: '',
      img: '',
      played: '',
      release_year: null,
      categories: ''
    },
    newGame: {
      title: '',
      img: '',
      played: '',
      release_year: null,
      categories: ''
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
