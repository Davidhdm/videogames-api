import axios from 'axios'

const baseURL = 'https://videogames-api-backend.herokuapp.com'

export const gameService = {
  getAllGames () {
    return axios.get(baseURL + '/api/games')
  }
}
