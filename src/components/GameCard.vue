<template>
  <div class="game_card">
    <div class="game_imgContainer">
      <img class="game_img" :src="img" :alt="'Picture of ' + title">
    </div>
    <div class="game_info">
      <span class="game_title">{{ title }}</span>
      <span :class="gameIsPlayedClass">{{ played }}</span>
      <span class="game_year">{{ 'Released in ' + release_year }}</span>
      <span class="game_categories">{{ categories }}</span>
    </div>
    <button @click="$emit('deleteGame', id)" class="deleteGame">
      <span class="iconify deleteGame_icon" data-icon="carbon:delete"></span>
    </button>
  </div>
</template>

<script>
/* import { gameService } from '@/services/gameService.js' */

export default {
  name: 'GameCard',
  props: {
    id: Number,
    img: String,
    title: String,
    played: String,
    release_year: Number,
    categories: String
  },
  methods: {
    /* async deleteGame (id) {
      try {
        await gameService.deleteGame(id)
        this.emit('deleteGame', id)
      } catch (e) {
        alert('Failed to delete')
      }
    } */
  },
  computed: {
    gameIsPlayedClass () {
      if (this.played === 'Played') {
        return 'game_played'
      }
      if (this.played === 'In progress') {
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
  transition: transform 0.3s cubic-bezier(0.29, 1.74, 0.49, 1.52);
}

.game_card:hover {
  cursor: pointer;
  transform: scale(1.07);
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
  border-top: 1px solid rgb(209, 209, 209);
  border-right: 1px solid rgb(209, 209, 209);
  border-bottom: 1px solid rgb(209, 209, 209);
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
.game_year,
.game_categories {
  margin: 5px 0;
}

.deleteGame {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 300px;
  width: 35px;
  height: 35px;
  position: absolute;
  top: -10px;
  right: -10px;
  text-align: center;
  font-size: 180%;
  padding: 7px;
  background-color: rgb(95, 185, 241);
  cursor: pointer;
  border: solid 1px rgb(0, 157, 255);
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    transform 0.15s ease;
}

.deleteGame:hover,
.deleteGame:active {
  color: rgb(0, 157, 255);
  background-color: white;
}

@media (max-width: 414px) {
  .game_card {
    min-width: 350px;
    max-width: 350px;
  }
}
</style>
