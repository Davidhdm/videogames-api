<template>
  <div class="container">
    <div class="search_box">
      <span class="iconify search_icon" data-icon="bx:bx-search"></span>
      <input class="searchInput" type="search" name="search_game" placeholder="Search a game..." v-model="search">
      <span class="searchBy_dropdown">{{ searchType || 'Search by...' }}
        <span class="iconify" data-icon="ic:sharp-arrow-back-ios-new" data-rotate="270deg"></span>
      </span>
    </div>
    <div class="filter_box">
      <label @click="filterByPlayedStatus('all')" for="filter_all" class="filterRadioBtn_label">
        <input v-model="filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_all" value="All" checked>Show all games
      </label>

      <label @click="filterByPlayedStatus('played')" for="filter_played" class="filterRadioBtn_label">
        <input v-model="filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_played" value="Played">Show only played games
      </label>

      <label @click="filterByPlayedStatus('notplayed')" for="filter_notplayed" class="filterRadioBtn_label">
        <input v-model="filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_notplayed" value="Not played">Show only unplayed games
      </label>

      <label @click="filterByPlayedStatus('inprogress')" for="filter_inprogress" class="filterRadioBtn_label">
        <input v-model="filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_inprogress" value="In progress">Show only in progress games
      </label>
    </div>

    <main class="games">
      <form class="newgame_card" v-if="creating">
        <div class="newgame_imgContainer">
          <textarea v-model="newGame.img" class="newgame_img" name="newgame_img" placeholder="Game picture" cols="30" rows="10"></textarea>
          <button @click.prevent="createGame" class="newgame_submit" type="submit">
            <span class="iconify" data-icon="subway:tick"></span>
          </button>
        </div>
        <div class="newgame_info">
          <input type="text" v-model="newGame.title" class="newgame_title" name="newgame_title" placeholder="Game title">
          <div class="radiobuttons">
            <div class="radio_option">
              <input type="radio" v-model="newGame.played" id="radio_played" name="newgame_played" value="Played">
              <label for="radio_played">Played</label>
            </div>
            <div class="radio_option">
              <input type="radio" v-model="newGame.played" id="radio_notplayed" name="newgame_played" value="Not played">
              <label for="radio_notplayed">Not played</label>
            </div>
            <div class="radio_option">
              <input type="radio" v-model="newGame.played" id="radio_inprogress" name="newgame_played" value="In progress">
              <label for="radio_inprogress">In progress</label>
            </div>
          </div>
          <input type="number" v-model="newGame.release_year" class="newgame_year" name="newgame_year" placeholder="Game release year">
          <input type="text" v-model="newGame.categories" class="newgame_categories" name="newgame_categories" placeholder="Categories">
        </div>
        <button @click="hideCreateCard" class="cancelCreate">
          <span class="iconify cancelCreate_icon" data-icon="ci:close-small"></span>
        </button>
      </form>

      <form class="newgame_card" v-if="editing">
        <div class="newgame_imgContainer">
          <textarea v-model="gameToEdit.img" class="newgame_img" name="newgame_img" placeholder="Game picture" cols="30" rows="10"></textarea>
          <button @click.prevent="editGame" class="editgame_submit" type="submit">
            <span class="iconify" data-icon="subway:tick"></span>
          </button>
        </div>
        <div class="newgame_info">
          <input type="text" v-model="gameToEdit.title" class="newgame_title" name="newgame_title" placeholder="Game title">
          <div class="radiobuttons">
            <div class="radio_option">
              <input type="radio" v-model="gameToEdit.played" id="radio_played_edit" name="newgame_played" value="Played">
              <label for="radio_played_edit">Played</label>
            </div>
            <div class="radio_option">
              <input type="radio" v-model="gameToEdit.played" id="radio_notplayed_edit" name="newgame_played" value="Not played">
              <label for="radio_notplayed_edit">Not played</label>
            </div>
            <div class="radio_option">
              <input type="radio" v-model="gameToEdit.played" id="radio_inprogress_edit" name="newgame_played" value="In progress">
              <label for="radio_inprogress_edit">In progress</label>
            </div>
          </div>
          <input type="number" v-model="gameToEdit.release_year" class="newgame_year" name="newgame_year" placeholder="Game release year">
          <input type="text" v-model="gameToEdit.categories" class="newgame_categories" name="newgame_categories" placeholder="Categories">
        </div>
        <button @click="hideEditCard" class="cancelCreate">
          <span class="iconify cancelCreate_icon" data-icon="ci:close-small"></span>
        </button>
      </form>

      <GameCard
        @deleteGame="deleteGame"
        @showEditCard="showEditCard"
        :game="game"
        v-for="game in filterGames"
        v-bind:key="game"
      />

      <button v-if="!creating" @click="showCreateCard" class="createGame">
        <span class="iconify createGame_icon" data-icon="mdi:plus-thick"></span>
      </button>
    </main>
  </div>
</template>

<script>
import GameCard from '@/components/GameCard.vue'
import { gameService } from '@/services/gameService.js'

export default {
  name: 'Games',
  components: {
    GameCard
  },
  data () {
    return {
      creating: false,
      editing: false,
      search: '',
      searchType: '',
      filterPlayed: 'all',
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
    }
  },
  methods: {
    async getAllGames () {
      try {
        const request = await gameService.getAllGames()
        request.data.forEach(game => {
          this.games.push(game)
        })
      } catch (error) {
        alert('Failed to load games')
        console.log(error.message)
      }
    },
    async createGame () {
      try {
        const newGame = this.newGame
        const response = await gameService.createGame(newGame)

        this.games = [...this.games, response.data]

        this.newGame.title = ''
        this.newGame.img = ''
        this.newGame.played = ''
        this.newGame.release_year = null
        this.newGame.categories = ''
      } catch (error) {
        alert('Failed to create game')
        console.log(error.message)
      }
    },
    async editGame () {
      try {
        const editedGame = this.gameToEdit
        await gameService.editGame(editedGame.id, editedGame)
        this.hideEditCard()
        this.games.forEach((game) => {
          if (game.id === editedGame.id) {
            game.title = editedGame.title
            game.img = editedGame.img
            game.played = editedGame.played
            game.release_year = editedGame.release_year
            game.categories = editedGame.categories
          }
        })
      } catch (error) {
        alert('Failed to edit game')
        console.log(error.message)
      }
    },
    async deleteGame (id) {
      try {
        await gameService.deleteGame(id)
        this.games = this.games.filter(game => game.id !== id)
      } catch (error) {
        alert('Failed to delete game')
        console.log(error.message)
      }
    },
    showCreateCard () {
      this.editing = false
      this.creating = true
      window.scrollTo(0, 0)
    },
    hideCreateCard () {
      this.creating = false
    },
    showEditCard (game) {
      this.gameToEdit.id = game.id
      this.gameToEdit.title = game.title
      this.gameToEdit.img = game.img
      this.gameToEdit.played = game.played
      this.gameToEdit.release_year = game.release_year
      this.gameToEdit.categories = game.categories

      this.creating = false
      this.editing = true
      window.scrollTo(0, 0)
    },
    hideEditCard () {
      this.editing = false
    },
    filterByPlayedStatus (status) {
      this.filterPlayed = status
    }
  },
  computed: {
    filterGames () {
      let games = []
      const search = this.search.toString().toLowerCase()

      if (this.searchType === 'All' || this.searchType === '') {
        this.games.forEach(game => {
          const gameValues = Object.values(game)

          for (let i = 0; i < gameValues.length; i++) {
            const convertedValue = gameValues[i].toString().toLowerCase()

            if (convertedValue.includes(search)) {
              games.push(game)
              break
            }
          }
        })
      }

      if (this.searchType === 'Title') {
        games = this.games.filter(game => game.title.toLowerCase().includes(search))
      }

      if (this.searchType === 'Release year') {
        games = this.games.filter(game => game.release_year.toString().includes(search))
      }

      if (this.searchType === 'Categories') {
        games = this.games.filter(game => game.categories.toLowerCase().includes(search))
      }

      if (this.filterPlayed === 'Played') {
        games = games.filter(game => game.played === 'Played')
      }

      if (this.filterPlayed === 'Not played') {
        games = games.filter(game => game.played === 'Not played')
      }

      if (this.filterPlayed === 'In progress') {
        games = games.filter(game => game.played === 'In progress')
      }

      return games
    }
  },
  created () {
    this.getAllGames()
  }
}
</script>

<style>
.games {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0px auto;
  max-width: max-content;
}

.newgame_card {
  position: relative;
  height: 165px;
  max-width: 450px;
  min-width: 450px;
  display:flex;
  margin: 30px;
  width: fit-content;
  border-radius: 10px;
  align-items: center;
  -webkit-box-shadow: 0px 0px 18px 3px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 18px 3px rgba(0,0,0,0.3);
  transition: transform 0.3s cubic-bezier(0.29, 1.74, 0.49, 1.52);
}

.newgame_card:hover, .newgame_card:focus-within {
  transform: scale(1.07);
}

.newgame_imgContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-width: 110px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.newgame_img {
  height: 100%;
}

.newgame_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  height: calc(100% - 42px);
  width: 100%;
  padding: 20px 30px;
  border: 1px solid rgb(209, 209, 209);
  border-left: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.newgame_info input {
  outline: none;
  padding: 4px;
  border: solid 1px rgb(190, 190, 190);
  border-radius: 4px;
  transition: transform 0.3s cubic-bezier(0.29, 1.74, 0.49, 1.52);
}

.newgame_info input:hover, .newgame_info input:focus {
  transform: scale(1.03);
  border-color: rgb(95, 185, 241);
}

.newgame_img {
  width: 70%;
  height: 30%;
  margin-top: 21px;
  outline: none;
  padding: 4px;
  border: solid 1px rgb(190, 190, 190);
  border-radius: 4px;
  transition: transform 0.3s cubic-bezier(0.29, 1.74, 0.49, 1.52);
}

.newgame_img:hover, .newgame_img:focus {
  transform: scale(1.03);
  border-color: rgb(95, 185, 241);
}

.newgame_notplayed {
  color: red;
  font-weight: 700;
}

.newgame_title,
.newgame_year,
.newgame_categories {
  margin: 5px 0;
}

.radiobuttons {
  display: flex;
  font-size: 80%;
}

.radio_option {
  margin: 4px;
}

.newgame_submit {
  margin-bottom: 20px;
  width: 102px;
  padding: 3px 3px;
  padding-top: 6px;
  border-radius: 4px;
  font-size: 130%;
  background-color: rgb(90, 235, 90);
  border: solid 1px rgb(31, 209, 31);
}

.editgame_submit {
  margin-bottom: 20px;
  width: 102px;
  padding: 3px 3px;
  padding-top: 6px;
  border-radius: 4px;
  font-size: 130%;
  background-color: rgb(95, 185, 241);
  border: solid 1px rgb(0, 157, 255);
  cursor: pointer;
}

.editgame_submit:hover,
.editgame_submit:active {
  color: rgb(0, 157, 255);
  background-color: white;
}

.createGame {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 75px;
  left: 75px;
  text-align: center;
  font-size: 220%;
  background-color: rgb(90, 235, 90);
  border: solid 1px rgb(31, 209, 31);
}

.cancelCreate {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  width: 35px;
  height: 35px;
  position: absolute;
  top: -10px;
  right: -10px;
  text-align: center;
  font-size: 180%;
  padding: 0;
  background-color: rgb(240, 60, 60);
  border: solid 1px rgb(226, 36, 36);
}

.createGame:hover,
.createGame:active,
.newgame_submit:hover,
.newgame_submit:active {
  color: rgb(31, 209, 31);
  background-color: white;
}

.createGame, .cancelCreate, .newgame_submit, .editgame_submit {
  /* background-color: rgb(95, 185, 241); */
  cursor: pointer;
  /* border: solid 1px rgb(0, 157, 255); */
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    transform 0.15s ease;
}

.cancelCreate:hover,
.cancelCreate:active {
  color: rgb(240, 60, 60);
  background-color: white;
}

.searchInput {
  padding: 4px 8px;
  padding-left: 38px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 20px;
}

.search_box {
  position: relative;
  max-width: max-content;
  margin: 10px auto;
}

.search_icon {
  position: absolute;
  left: 0;
  top: 3px;
  font-size: 150%;
}

.filter_box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 40px;
  right: 250px;
}

.filterRadioBtn {
  margin: 5px;
}

.searchBy_dropdown {
  border-bottom: solid 1px black;
  font-size: 18px;
  padding: 5px 0;
  cursor: pointer;
}

.searchBy_dropdown {
  border-bottom: solid 1px black;
  font-size: 18px;
  padding: 5px 0;
  cursor: pointer;
}

@media (max-width: 414px) {
  .newgame_card {
    min-width: 350px;
    max-width: 350px;
  }

  .newgame_submit {
    width: 85px;
  }
}
</style>
