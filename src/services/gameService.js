import axios from 'axios'

const baseURL = 'https://videogames-api-backend.herokuapp.com'

export const gameService = {
  getAllGames () {
    return axios.get(baseURL + '/api/games')
  },
  createGame (newGame) {
    return axios.post(baseURL + '/api/games', {
      title: newGame.title,
      img: newGame.img,
      played: newGame.played,
      release_year: newGame.release_year,
      categories: newGame.categories
    })
  },
  deleteGame (id) {
    return axios.delete(baseURL + '/api/games/' + id)
  }
}
