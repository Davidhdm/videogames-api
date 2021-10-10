<template>
  <form class="newgame_card">
    <div class="newgame_imgContainer">
      <textarea v-model="$store.state.gameToEdit.img" class="newgame_img" name="newgame_img" placeholder="Game picture" cols="30" rows="10"></textarea>
      <button @click.prevent="editGame" class="editgame_submit" type="submit">
        <span class="iconify" data-icon="subway:tick"></span>
      </button>
    </div>
    <div class="newgame_info">
      <input type="text" v-model="$store.state.gameToEdit.title" class="newgame_title" name="newgame_title" placeholder="Game title">
      <div class="radiobuttons">
        <div class="radio_option">
          <input type="radio" v-model="$store.state.gameToEdit.played" id="radio_played_edit" name="newgame_played" value="Played">
          <label for="radio_played_edit">Played</label>
        </div>
        <div class="radio_option">
          <input type="radio" v-model="$store.state.gameToEdit.played" id="radio_notplayed_edit" name="newgame_played" value="Not played">
          <label for="radio_notplayed_edit">Not played</label>
        </div>
        <div class="radio_option">
          <input type="radio" v-model="$store.state.gameToEdit.played" id="radio_inprogress_edit" name="newgame_played" value="In progress">
          <label for="radio_inprogress_edit">In progress</label>
        </div>
      </div>
      <input type="number" v-model="$store.state.gameToEdit.release_year" class="newgame_year" name="newgame_year" placeholder="Game release year">
      <input type="text" v-model="$store.state.gameToEdit.categories" class="newgame_categories" name="newgame_categories" placeholder="Categories">
    </div>
    <button @click="hideEditCard" class="cancelCreate">
      <span class="iconify cancelCreate_icon" data-icon="ci:close-small"></span>
    </button>
  </form>
</template>

<script>
import { gameService } from '@/services/gameService.js'

export default {
  name: 'EditGameCard',
  methods: {
    async editGame () {
      try {
        await gameService.editGame(this.$store.state.gameToEdit.id, this.$store.state.gameToEdit)
        this.hideEditCard()
        this.$store.state.games.forEach((game) => {
          if (game.id === this.$store.state.gameToEdit.id) {
            game.title = this.$store.state.gameToEdit.title
            game.img = this.$store.state.gameToEdit.img
            game.played = this.$store.state.gameToEdit.played
            game.release_year = this.$store.state.gameToEdit.release_year
            game.categories = this.$store.state.gameToEdit.categories
          }
        })
      } catch (error) {
        alert('Failed to edit game')
        console.log(error.message)
      }
    },
    hideEditCard () {
      this.$store.state.editing = false
    }
  }
}
</script>
