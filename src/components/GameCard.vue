<template>
  <div class="game_card">
    <div class="game_imgContainer">
      <img class="game_img" :src="img" :alt="'Picture of ' + title">
    </div>
    <span class="game_title">{{ title }}</span>
    <span class="game_played">{{ gameIsPlayed }}</span>
    <span class="game_year">{{ release_year }}</span>
    <span class="game_categories">{{ categories }}</span>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    img: String,
    title: String,
    played: Boolean,
    release_year: Number,
    categories: String
  },
  methods: {

  },
  computed: {
    gameIsPlayed () {
      return this.played ? 'Finished' : 'Not played yet'
    }
  }
}
</script>
