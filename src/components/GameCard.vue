<template>
  <div class="game_card">
    <div class="game_imgContainer">
      <img class="game_img" :src="game.img" :alt="'Picture of ' + game.title">
    </div>
    <div class="game_info">
      <span class="game_title">{{ game.title }}</span>
      <span :class="gameIsPlayedClass">{{ game.played }}</span>
      <span class="game_year">{{ 'Released in ' + game.release_year }}</span>
      <span class="game_categories">{{ game.categories }}</span>
    </div>
    <button @click="showEditCard(game)" class="editGame">
      <span class="iconify" data-icon="clarity:edit-line"></span>
    </button>
    <button @click="deleteGame(game.id)" class="deleteGame">
      <span class="iconify deleteGame_icon" data-icon="carbon:delete"></span>
    </button>
  </div>
</template>

<script>
import { gameService } from '@/services/gameService.js'

export default {
  name: 'GameCard',
  props: {
    game: Object
  },
  methods: {
    async deleteGame (id) {
      try {
        await gameService.deleteGame(id)
        this.$store.state.games = this.$store.state.games.filter(game => game.id !== id)
      } catch (error) {
        alert('Failed to delete game')
        console.log(error.message)
      }
    },
    showEditCard (game) {
      this.$store.state.gameToEdit.id = game.id
      this.$store.state.gameToEdit.title = game.title
      this.$store.state.gameToEdit.img = game.img
      this.$store.state.gameToEdit.played = game.played
      this.$store.state.gameToEdit.release_year = game.release_year
      this.$store.state.gameToEdit.categories = game.categories

      this.$store.state.creating = false
      this.$store.state.editing = true
      window.scrollTo(0, 0)
    }
  },
  computed: {
    gameIsPlayedClass () {
      if (this.game.played === 'Played') {
        return 'game_played'
      }
      if (this.game.played === 'In progress') {
        return 'game_inprogress'
      }
      return 'game_notplayed'
    }
  }
}
</script>

<style>
.game_card {
  height: 165px;
  max-width: 450px;
  min-width: 450px;
  display:flex;
  margin: 30px;
  position: relative;
  width: fit-content;
  border-radius: 10px;
  align-items: center;
  -webkit-box-shadow: 0px 0px 18px 3px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 18px 3px rgba(0,0,0,0.3);
  transition:
    transform 0.15s ease,
    background-color 0.05s ease;
}

.game_card:hover {
  cursor: pointer;
  transform: scale(1.02);
  background-color: rgb(250, 250, 250);
}

.game_imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: 110px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
}

.game_img {
  height: 100%;
}

.game_info {
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

.game_title {
  font-weight: 700;
}

.game_categories {
  font-style: italic;
}

.game_played {
  color: rgb(1, 173, 1);
  font-weight: 700;
}

.game_notplayed {
  color: red;
  font-weight: 700;
}

.game_inprogress {
  color: rgb(0, 157, 255);
  font-weight: 700;
}

.game_title,
.game_played,
.game_notplayed,
.game_inprogress,
.game_year,
.game_categories {
  margin: 5px 0;
}

.deleteGame, .editGame {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  position: absolute;
  top: -20px;
  font-size: 180%;
  padding: 7px;
  cursor: pointer;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
}

.editGame {
  border-radius: 7px 0 0 7px;
  right: 24px;
  background-color: rgb(95, 185, 241);
  border: solid 1px rgb(0, 157, 255);
  border-right: none;
}

.deleteGame {
  border-radius: 0 7px 7px 0;
  right: -10px;
  background-color: rgb(240, 60, 60);
  border: solid 1px rgb(226, 36, 36);
  border-left: none;
}

.deleteGame:hover,
.deleteGame:active {
  color: rgb(240, 60, 60);
  background-color: white;
}

.editGame:hover,
.editGame:active {
  color: rgb(0, 157, 255);
  background-color: white;
}

@media (max-width: 414px) {
  .game_card {
    min-width: 330px;
    max-width: 330px;
  }
}
</style>
