<template>
  <div class="games">
    <GameCard/>
  </div>
</template>

<script>
import GameCard from '@/components/GameCard.vue'

export default {
  name: 'Games',
  components: {
    GameCard
  }
}
</script>
