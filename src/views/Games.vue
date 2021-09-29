<template>
  <main class="games">
    <form class="newgame_card" v-if="creating">
      <div class="newgame_imgContainer">
        <textarea v-model="newGame.img" class="newgame_img" name="newgame_img" placeholder="Game picture" cols="30" rows="10"></textarea>
        <button class="newgame_submit" type="submit">
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
            <input type="radio" v-model="newGame.played" id="radio_notplayed" name="newgame_played" value="Not played yet">
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
    </form>

    <GameCard
      :img="game.img"
      :title="game.title"
      :played="game.played"
      :release_year="game.release_year"
      :categories="game.categories"
      v-for="game in games"
      v-bind:key="game"
    />
    <button v-if="!creating" @click="showCreateCard" class="createGame">
      <span class="iconify createGame_icon" data-icon="bi:plus-lg"></span>
    </button>
  </main>
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
      games: [],
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
      const request = await gameService.getAllGames()
      request.data.forEach(game => {
        this.games.push(game)
      })
    },
    showCreateCard () {
      this.creating = !this.creating
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
  transform: scale(1.1);
}

.newgame_imgContainer {
  /* position: relative; */
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
  border-top: 1px solid rgb(209, 209, 209);
  border-right: 1px solid rgb(209, 209, 209);
  border-bottom: 1px solid rgb(209, 209, 209);
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
}

.createGame {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 300px;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 75px;
  left: 75px;
  text-align: center;
}

.createGame, .newgame_submit {
  background-color: rgb(95, 185, 241);
  font-size: 130%;
  cursor: pointer;
  border: solid 1px rgb(0, 157, 255);
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    transform 0.15s ease;
}

.newgame_submit:hover,
.newgame_submit:active,
.createGame:hover,
.createGame:active {
  color: rgb(0, 157, 255);
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
