<template>
  <form class="newgame_card">
    <div class="newgame_imgContainer">
      <textarea v-model="$store.state.newGame.img" class="newgame_img" name="newgame_img" placeholder="Game picture" cols="30" rows="10"></textarea>
      <button @click.prevent="createGame" class="newgame_submit" type="submit">
        <span class="iconify" data-icon="subway:tick"></span>
      </button>
    </div>
    <div class="newgame_info">
      <input type="text" v-model="$store.state.newGame.title" class="newgame_title" name="newgame_title" placeholder="Game title">
      <div class="newgame_radiobuttons">
        <div class="newgame_radio_option">
          <input type="radio" v-model="$store.state.newGame.played" id="radio_played" name="newgame_played" value="Played">
          <label for="radio_played">Played</label>
        </div>
        <div class="newgame_radio_option">
          <input type="radio" v-model="$store.state.newGame.played" id="radio_notplayed" name="newgame_played" value="Not played">
          <label for="radio_notplayed">Not played</label>
        </div>
        <div class="newgame_radio_option">
          <input type="radio" v-model="$store.state.newGame.played" id="radio_inprogress" name="newgame_played" value="In progress">
          <label for="radio_inprogress">In progress</label>
        </div>
      </div>
      <input type="number" v-model="$store.state.newGame.release_year" class="newgame_year" name="newgame_year" placeholder="Game release year">
      <input type="text" v-model="$store.state.newGame.categories" class="newgame_categories" name="newgame_categories" placeholder="Categories">
    </div>
    <button @click.prevent="hideCreateCard" class="cancelCreate">
      <span class="iconify" data-icon="ci:close-small"></span>
    </button>
  </form>
</template>

<script>
import { gameService } from '@/services/gameService.js'

export default {
  name: 'CreateGameCard',
  methods: {
    async createGame () {
      try {
        const newGame = this.$store.state.newGame
        const response = await gameService.createGame(newGame)

        /* this.hideCreateCard() */
        this.$store.state.games = [...this.$store.state.games, response.data]

        this.$store.state.newGame.title = ''
        this.$store.state.newGame.img = ''
        this.$store.state.newGame.played = ''
        this.$store.state.newGame.release_year = null
        this.$store.state.newGame.categories = ''
      } catch (error) {
        alert('Failed to create game')
        console.log(error.message)
      }
    },
    hideCreateCard () {
      this.$store.state.creating = false
    }
  }
}
</script>

<style scoped>
.newgame_card {
  border: 1px solid var(--dark-color3);
  background-color: var(--dark-color2);
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
  transition:
    transform 0.15s ease,
    background-color 0.05s ease;
}

.newgame_card:hover,
.newgame_card:focus-within {
  transform: scale(1.02);
  background-color: var(--dark-color3);
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

.newgame_radiobuttons {
  display: flex;
  font-size: 80%;
}

.newgame_radio_option {
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

.cancelCreate,
.newgame_submit {
  cursor: pointer;
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

.newgame_submit:hover,
.newgame_submit:active {
  color: rgb(31, 209, 31);
  background-color: white;
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
