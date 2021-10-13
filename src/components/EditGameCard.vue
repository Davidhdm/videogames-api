<template>
  <form class="editgame_card">
    <div class="editgame_imgContainer">
      <textarea v-model="$store.state.gameToEdit.img" class="editgame_img" name="editgame_img" placeholder="Game picture" cols="30" rows="10"></textarea>
      <button @click.prevent="editGame" class="editgame_submit" type="submit">
        <span class="iconify" data-icon="subway:tick"></span>
      </button>
    </div>
    <div class="editgame_info">
      <input type="text" v-model="$store.state.gameToEdit.title" class="editgame_title" name="editgame_title" placeholder="Game title">
      <div class="editgame_radiobuttons">
        <div class="editgame_radio_option">
          <input type="radio" v-model="$store.state.gameToEdit.played" id="radio_played_edit" name="editgame_played" value="Played">
          <label for="radio_played_edit">Played</label>
        </div>
        <div class="editgame_radio_option">
          <input type="radio" v-model="$store.state.gameToEdit.played" id="radio_notplayed_edit" name="editgame_played" value="Not played">
          <label for="radio_notplayed_edit">Not played</label>
        </div>
        <div class="editgame_radio_option">
          <input type="radio" v-model="$store.state.gameToEdit.played" id="radio_inprogress_edit" name="editgame_played" value="In progress">
          <label for="radio_inprogress_edit">In progress</label>
        </div>
      </div>
      <input type="number" v-model="$store.state.gameToEdit.release_year" class="editgame_year" name="editgame_year" placeholder="Game release year">
      <input type="text" v-model="$store.state.gameToEdit.categories" class="editgame_categories" name="editgame_categories" placeholder="Categories">
    </div>
    <button @click="hideEditCard" class="cancelEdit">
      <span class="iconify" data-icon="ci:close-small"></span>
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

<style scoped>
.editgame_card {
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

.editgame_card:hover,
.editgame_card:focus-within {
  transform: scale(1.02);
  background-color: rgb(250, 250, 250);
}

.editgame_imgContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-width: 110px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.editgame_img {
  height: 100%;
}

.editgame_info {
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

.editgame_info input {
  outline: none;
  padding: 4px;
  border: solid 1px rgb(190, 190, 190);
  border-radius: 4px;
  transition: transform 0.3s cubic-bezier(0.29, 1.74, 0.49, 1.52);
}

.editgame_info input:hover, .editgame_info input:focus {
  transform: scale(1.03);
  border-color: rgb(95, 185, 241);
}

.editgame_img {
  width: 70%;
  height: 30%;
  margin-top: 21px;
  outline: none;
  padding: 4px;
  border: solid 1px rgb(190, 190, 190);
  border-radius: 4px;
  transition: transform 0.3s cubic-bezier(0.29, 1.74, 0.49, 1.52);
}

.editgame_img:hover, .editgame_img:focus {
  transform: scale(1.03);
  border-color: rgb(95, 185, 241);
}

.editgame_notplayed {
  color: red;
  font-weight: 700;
}

.editgame_title,
.editgame_year,
.editgame_categories {
  margin: 5px 0;
}

.editgame_radiobuttons {
  display: flex;
  font-size: 80%;
}

.editgame_radio_option {
  margin: 4px;
}

.editgame_submit {
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

.cancelEdit {
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

.cancelEdit,
.editgame_submit {
  cursor: pointer;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    transform 0.15s ease;
}

.cancelEdit:hover,
.cancelEdit:active {
  color: rgb(240, 60, 60);
  background-color: white;
}

.editgame_submit:hover,
.editgame_submit:active {
  color: rgb(31, 209, 31);
  background-color: white;
}

@media (max-width: 414px) {
  .editgame_card {
    min-width: 350px;
    max-width: 350px;
  }

  .editgame_submit {
    width: 85px;
  }
}
</style>
