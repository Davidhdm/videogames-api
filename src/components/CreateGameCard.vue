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
      <div class="radiobuttons">
        <div class="radio_option">
          <input type="radio" v-model="$store.state.newGame.played" id="radio_played" name="newgame_played" value="Played">
          <label for="radio_played">Played</label>
        </div>
        <div class="radio_option">
          <input type="radio" v-model="$store.state.newGame.played" id="radio_notplayed" name="newgame_played" value="Not played">
          <label for="radio_notplayed">Not played</label>
        </div>
        <div class="radio_option">
          <input type="radio" v-model="$store.state.newGame.played" id="radio_inprogress" name="newgame_played" value="In progress">
          <label for="radio_inprogress">In progress</label>
        </div>
      </div>
      <input type="number" v-model="$store.state.newGame.release_year" class="newgame_year" name="newgame_year" placeholder="Game release year">
      <input type="text" v-model="$store.state.newGame.categories" class="newgame_categories" name="newgame_categories" placeholder="Categories">
    </div>
    <button @click="hideCreateCard" class="cancelCreate">
      <span class="iconify cancelCreate_icon" data-icon="ci:close-small"></span>
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
