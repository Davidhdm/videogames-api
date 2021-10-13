<template>
  <div class="container">
    <div class="search_box">
      <div class="searchInput_box">
        <span class="iconify search_icon" data-icon="bx:bx-search"></span>
        <input class="searchInput" type="search" name="search_game" placeholder="Search a game..." v-model="$store.state.search">
      </div>
      <div  class="searchBy">
        <a href="#" @click="toggleDropdown" @blur="$store.state.dropDownIsOpen = false" class="searchBy_dropdown">
          {{ $store.state.searchType || 'Search by...' }}
          <span class="iconify searchBy_icon" data-icon="ic:sharp-arrow-back-ios-new" data-rotate="270deg"></span>
        </a>
        <transition name="expand">
          <div v-show="$store.state.dropDownIsOpen" class="searchBy_options">
            <span @click="setSearchType('Title')" class="searchBy_option">Title</span>
            <span @click="setSearchType('Release year')" class="searchBy_option">Release year</span>
            <span @click="setSearchType('Categories')" class="searchBy_option">Categories</span>
            <span @click="setSearchType('All')" class="searchBy_option">All</span>
          </div>
        </transition>
      </div>
    </div>
    <div class="filter_box">
      <label @click="filterByPlayedStatus('all')" for="filter_all" class="filterRadioBtn_label">
        <input v-model="$store.state.filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_all" value="All" checked>Show all games
      </label>

      <label @click="filterByPlayedStatus('played')" for="filter_played" class="filterRadioBtn_label">
        <input v-model="$store.state.filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_played" value="Played">Show only played games
      </label>

      <label @click="filterByPlayedStatus('notplayed')" for="filter_notplayed" class="filterRadioBtn_label">
        <input v-model="$store.state.filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_notplayed" value="Not played">Show only unplayed games
      </label>

      <label @click="filterByPlayedStatus('inprogress')" for="filter_inprogress" class="filterRadioBtn_label">
        <input v-model="$store.state.filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_inprogress" value="In progress">Show only in progress games
      </label>
    </div>

    <main class="games">
      <CreateGameCard  v-if="$store.state.creating"/>
      <EditGameCard  v-if="$store.state.editing"/>

      <GameCard
        :game="game"
        v-for="game in filterGames"
        v-bind:key="game"
      />
      <button v-show="!$store.state.creating" @click="showCreateCard" class="createGame">
        <span class="iconify createGame_icon" data-icon="mdi:plus-thick"></span>
      </button>
    </main>
  </div>
</template>

<script>
import GameCard from '@/components/GameCard.vue'
import CreateGameCard from '@/components/CreateGameCard.vue'
import EditGameCard from '@/components/EditGameCard.vue'
import { gameService } from '@/services/gameService.js'

export default {
  name: 'Games',
  components: {
    GameCard,
    CreateGameCard,
    EditGameCard
  },
  methods: {
    async getAllGames () {
      try {
        const request = await gameService.getAllGames()
        this.$store.state.games = request.data
      } catch (error) {
        alert('Failed to load games')
        console.log(error.message)
      }
    },
    filterByPlayedStatus (status) {
      this.$store.state.filterPlayed = status
    },
    showCreateCard () {
      this.$store.state.editing = false
      this.$store.state.creating = true
      window.scrollTo(0, 0)
    },
    toggleDropdown () {
      this.$store.state.dropDownIsOpen = !this.$store.state.dropDownIsOpen
    },
    setSearchType (searchType) {
      this.$store.state.searchType = searchType
    }
  },
  computed: {
    filterGames () {
      let games = []
      const search = this.$store.state.search.toString().toLowerCase()

      if (this.$store.state.searchType === 'All' || this.$store.state.searchType === '') {
        this.$store.state.games.forEach(game => {
          const gameValues = Object.values(game)

          for (let i = 0; i < gameValues.length; i++) {
            const convertedValue = gameValues[i].toString().toLowerCase()

            if (convertedValue.includes(search)) {
              games.push(game)
              break
            }
          }
        })
      }

      if (this.$store.state.searchType === 'Title') {
        games = this.$store.state.games.filter(game => game.title.toLowerCase().includes(search))
      }

      if (this.$store.state.searchType === 'Release year') {
        games = this.$store.state.games.filter(game => game.release_year.toString().includes(search))
      }

      if (this.$store.state.searchType === 'Categories') {
        games = this.$store.state.games.filter(game => game.categories.toLowerCase().includes(search))
      }

      if (this.$store.state.filterPlayed === 'Played') {
        games = games.filter(game => game.played === 'Played')
      }

      if (this.$store.state.filterPlayed === 'Not played') {
        games = games.filter(game => game.played === 'Not played')
      }

      if (this.$store.state.filterPlayed === 'In progress') {
        games = games.filter(game => game.played === 'In progress')
      }

      return games
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
  margin: 50px auto;
  max-width: max-content;
}

.createGame {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 75px;
  left: 75px;
  text-align: center;
  font-size: 220%;
  background-color: rgb(90, 235, 90);
  border: solid 1px rgb(31, 209, 31);
  cursor: pointer;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    transform 0.15s ease;
}

.createGame:hover,
.createGame:active {
  color: rgb(31, 209, 31);
  background-color: white;
}

.search_box {
  display: flex;
  justify-content: center;
  margin-top: 70px;
}

.searchInput {
  padding: 4px 8px;
  padding-left: 38px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 20px;
}

.searchInput_box {
  position: relative;
  max-width: max-content;
  /* margin: 10px 0; */
}

.search_icon {
  position: absolute;
  left: 0;
  top: 3px;
  font-size: 150%;
}

.filter_box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 40px;
  right: 250px;
}

.filterRadioBtn {
  margin: 5px;
}

.searchBy_dropdown {
  min-width: 147px;
  width: 147px;
  border-bottom: solid 1px black;
  font-size: 20px;
  padding: 9px 9px 7px 9px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  border-radius: 8px 8px 0 0;
  text-decoration: none;
  color: unset;
}

.searchBy_options {
  width: 147px;
  background-color: white;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 20px;
  border: solid 1px black;
  border-top: none;
  border-radius: 0 0 8px 8px;
  position: absolute;
  z-index: 5;
  top: 33px;
  overflow: hidden;
}

.searchBy_option {
  padding: 9px 9px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.searchBy_option:hover {
  background-color: rgb(95, 185, 241);
}

.searchBy {
  position: relative;
  min-width: 150px;
  margin: 0px 20px;
}

.searchBy_dropdown:hover {
  background-color: rgb(221, 221, 221);
}

.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.15s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
}
</style>
