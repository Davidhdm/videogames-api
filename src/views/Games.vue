<template>
  <div class="games">
    <!-- <div v-for="game in games" v-bind:key="game">
      {{ game.title }}
    </div> -->
    <GameCard
      :img="game.img"
      :title="game.title"
      :played="game.played"
      :release_year="game.release_year"
      :categories="game.categories"
      v-for="game in games"
      v-bind:key="game"
    />
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
      games: []
    }
  },
  methods: {
    async getAllGames () {
      const request = await gameService.getAllGames()
      request.data.forEach(game => {
        this.games.push(game)
      })
    }
  },
  created () {
    this.getAllGames()
  }
}
</script>

<style>
.games {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0px auto;
  width: max-content;
}
</style>
